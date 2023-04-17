;;Constants for Static addresses
(define-constant contract-address (as-contract tx-sender))
(define-constant contract-admin tx-sender)
;;===========================================================================================================
;;Core FT and NFT trait
(use-trait core-ft-trait 'STT4SQP5RC1BFAJEQKBHZMXQ8NQ7G118F0XRWTMV.sip-010-trait-ft-standard.sip-010-trait)
;;(use-trait core-nft-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

;;Constant Error codes and meaning
(define-constant asset-not-found (err u100))
(define-constant unauthorized-user (err u101))
(define-constant tradeable-asset-not-found (err u102))
(define-constant unauthorized-action (err u103))
(define-constant insufficient-trade-bal (err u104))
(define-constant invalid-trade-asset (err 105))

;;Increements and Decreements according to trade offers available
(define-data-var offer-count uint u0)
(define-data-var offer-set uint u0)
(define-map trades { trade-owner: principal, asset: (optional principal) } uint)
(define-map trade-offers uint 
    { 
        trading: { asset: (optional principal), asset-name: (string-ascii 32), amount: uint },
        trading-for: { asset: (optional principal), asset-name: (string-ascii 32), amount-for: uint },
    }
)

;;This is a map of all tradeable assets, only admin's can make increement or 
;;decreement and also diasable or enable to this map
(define-map tradeable-tokens { asset: principal}  bool)
;;ALL ADMIN FUNCTIONS START======================================================
(define-public (add-tradeable-tokens (token <core-ft-trait>))
    (begin
        (asserts! (is-eq tx-sender contract-admin) unauthorized-user)
        (ok (map-set tradeable-tokens {asset: (contract-of token)} true))     
    )
)
(define-public (remove-tradeable-tokens (token <core-ft-trait>))
    (begin
        (asserts! (is-eq tx-sender contract-admin) unauthorized-user)
        (ok (map-delete tradeable-tokens {asset: (contract-of token)}))     
    )
)
(define-public (enable-tradeable-tokens (token <core-ft-trait>))
    (begin
        (asserts! (is-eq tx-sender contract-admin) unauthorized-user)
        (ok (map-set tradeable-tokens {asset: (contract-of token)} true))     
    )
)
(define-public (disable-tradeable-tokens (token <core-ft-trait>))
    (begin
        (asserts! (is-eq tx-sender contract-admin) unauthorized-user)
        (ok (map-set tradeable-tokens {asset: (contract-of token)} false))     
    )
)
;;===========================================================================================

;;Private functions for stx and ft transfer's
;;STX Asset transfer
(define-private (stx-asset-transfer (amount uint) (from principal) (to principal)) 
    (ok (as-contract (stx-transfer? amount from to)))
)
;;FT asset transfer
(define-private (ft-asset-transfer (asset <core-ft-trait>) (amount uint) (from principal) (to principal)) 
    (ok (as-contract (contract-call? asset transfer amount from to none)))
)
;;==================================================================================================

;;Trade functions Start===========================================
;;Trade Stx asset
(define-public (trade-stx-asset (asset-for <core-ft-trait>) (amount uint) (amount-for uint) (from principal)) 
    (let 
        (
            (existing-offer (default-to u0 (map-get? trades {trade-owner: tx-sender, asset: none})))
            (trading-for-asset-name (unwrap! (contract-call? asset-for get-name) asset-not-found))
            (updated-amount (+ (default-to u0 (get amount (get trading (map-get? trade-offers (default-to u0 (map-get? trades {trade-owner: tx-sender, asset: none})))))) amount))
        ) 
        (if (> existing-offer u0) (var-set offer-set existing-offer) (begin (var-set offer-count (+ (var-get offer-count) u1)) (var-set offer-set (var-get offer-count))))
        (is-ok (stx-transfer? amount from contract-address))        
        (map-set trades { trade-owner: tx-sender, asset: none } (var-get offer-set))
        (map-set trade-offers (var-get offer-set) 
            {
                trading: { asset: none, asset-name: "stx", amount: updated-amount },
                trading-for: { asset: (some (contract-of asset-for)), asset-name: trading-for-asset-name, amount-for: amount-for }
            }
        )
        (ok (var-set offer-set u0))
    )
)
;;Trade FT asset
(define-public (trade-ft-asset (trading-asset <core-ft-trait>) (asset-for <core-ft-trait>) (amount uint) (amount-for uint) (from principal)) 
    (let 
        (
            (existing-offer (default-to u0 (map-get? trades {trade-owner: tx-sender, asset: (some (contract-of trading-asset)) })))
            (trading-asset-name (unwrap! (contract-call? trading-asset get-name) asset-not-found))
            (trading-for-asset-name (unwrap! (contract-call? asset-for get-name) asset-not-found))
            (updated-amount (+ (default-to u0 (get amount (get trading (map-get? trade-offers (default-to u0 (map-get? trades {trade-owner: tx-sender, asset: (some (contract-of trading-asset))})))))) amount))
        ) 
        (if (> existing-offer u0) (var-set offer-set existing-offer) (begin (var-set offer-count (+ (var-get offer-count) u1)) (var-set offer-set (var-get offer-count))))
        (is-ok (contract-call? trading-asset transfer amount tx-sender contract-address none))        
        (map-set trades { trade-owner: tx-sender, asset: (some (contract-of trading-asset)) } (var-get offer-set))
        (map-set trade-offers (var-get offer-set) 
            {
                trading: { asset: (some (contract-of trading-asset)), asset-name: trading-asset-name, amount: updated-amount },
                trading-for: { asset: (some (contract-of asset-for)), asset-name: trading-for-asset-name, amount-for: amount-for }
            }
        )
        (ok (var-set offer-set u0))
    )
)
;;Buy Asset
(define-public (buy-stx-asset (trade-owner principal) (buy-with <core-ft-trait>) (buy-amount uint)) 
    (let 
        (
            ;;Get trade index, fail if trade isn't found
            (trade-index  (unwrap! (map-get? trades { trade-owner: trade-owner, asset: none}) asset-not-found))
            ;;Trading data for re-set
            (trading-amount (unwrap! (get amount (get trading (map-get? trade-offers trade-index) )) asset-not-found))
            (trading-asset-name (unwrap! (get asset-name (get trading (map-get? trade-offers trade-index) )) asset-not-found))
            ;;Trading-for data for re-set
            (trading-for-asset (unwrap! (get asset (get trading-for (map-get? trade-offers trade-index) )) asset-not-found))
            (trading-for-asset-name (unwrap! (get asset-name (get trading-for (map-get? trade-offers trade-index) )) asset-not-found))
            (trading-amount-for (unwrap! (get amount-for (get trading-for (map-get? trade-offers trade-index) )) asset-not-found))
            ;;Buyer is to pay the below amount
            (payment-amount (* buy-amount trading-amount-for))

        ) 
        (asserts! (not (is-eq trade-owner tx-sender)) unauthorized-user)
        ;; (asserts! (is-eq (default-to u0 trading-for-asset) (contract-of buy-with)) invalid-trade-asset)
        (asserts! (>= trading-amount buy-amount) insufficient-trade-bal)
        
        (is-ok (ft-asset-transfer buy-with payment-amount tx-sender trade-owner))
        (is-ok (stx-asset-transfer buy-amount contract-address tx-sender))
        ;; (ok (map-set trade-offers trade-index 
        ;;     {
        ;;         trading: { asset: none, asset-name: trading-asset-name, amount: (- trading-amount buy-amount)},
        ;;         trading-for: { asset: trading-for-asset, asset-name: trading-for-asset-name, amount-for: trading-amount-for}
        ;;     }
        ;; ))
        (ok trading-for-asset)
    )
)
;;Trade functions Ends===========================================

;;View Trades and Ongoing Trade Offers for Stx and FT
(define-read-only (view-stx-trades (trading-asset (optional principal)) (trade-owner principal))
    (ok (map-get? trades { trade-owner: trade-owner, asset: trading-asset}))
)
(define-read-only (view-ft-trades (trading-asset <core-ft-trait>) (trade-owner principal))
    (ok (map-get? trades { trade-owner: trade-owner, asset: (some (contract-of trading-asset))}))
)
(define-read-only (view-stx-trade-offers (trading-asset (optional principal)) (trade-owner principal))
    (ok (map-get? trade-offers (default-to u0 (map-get? trades {trade-owner: trade-owner, asset: trading-asset}))))
)
(define-read-only (view-ft-trade-offers (trading-asset <core-ft-trait>) (trade-owner principal))
    (ok (map-get? trade-offers (default-to u0 (map-get? trades {trade-owner: trade-owner, asset: (some (contract-of trading-asset))}))))
)
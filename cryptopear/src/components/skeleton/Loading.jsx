import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Loading = () => {
    return (
        <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} height={40}/>
            {/* For other variants, adjust the size with `width` and `height` */}
            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                <Skeleton animation="wave" variant="circular" width={200} height={200} />
                <Skeleton animation="wave" variant="circular" width={100} height={100} />
            </Box>

            <Skeleton animation="wave" variant="rounded" width={300} height={30} />
            <Skeleton animation="wave" variant="rounded" width={300} height={30} />
            <Skeleton animation="wave" variant="rounded" width={300} height={30} />

            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                <Skeleton animation="wave" sx={{ marginRight: 11.4 }} variant="circular" width={40} height={40} />
                <Skeleton animation="wave" sx={{ marginRight: 11.4 }} variant="circular" width={40} height={40} />
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
            </Box>

        </Stack>
    );
};

export default Loading;
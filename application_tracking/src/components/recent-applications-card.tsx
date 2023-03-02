import React from 'react'
import { Card, CardActionArea, CardContent, CardHeader, Stack } from '@mui/material';

const RecentApplicationsCard = () => {
    return (
        <div>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <h3>Recent Applications</h3>
                        <Stack></Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

export default RecentApplicationsCard
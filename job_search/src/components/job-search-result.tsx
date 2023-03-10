import React from 'react'
import { JobOpportunity } from '../models/JobOpportunity';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const JobSummaryIA = React.lazy(() => import('shared/JobSummaryIA'))

async function getJobSummaryIA() {
    await import('shared/JobSummaryIA')
}
import('shared/JobSummaryIA').then((val) => {
    console.log('loaded jobSummaryIA')
})

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const JobSearchResult = ({ job, onApply }: { job: JobOpportunity, onApply: (jobId: string) => void }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 800 }}>
            <CardContent>
                <Stack direction="row" justifyContent={'space-between'}>
                    <React.Suspense fallback={'loading'}>
                        <JobSummaryIA {...job} />
                    </React.Suspense>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </Stack>

            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ textAlign: 'left' }}>
                    {job.description}
                </CardContent>
                <CardActions>
                    <Button onClick={() => { onApply(job.id) }}>Apply</Button>
                </CardActions>
            </Collapse>

        </Card >
    )
}

export default JobSearchResult
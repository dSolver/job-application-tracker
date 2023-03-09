import React from 'react'


const JobSummaryIA = 
    React.lazy(() => import("shared/JobSummaryIA"))

async function getJobSummaryIA() {
    await import('shared/JobSummaryIA');
}
import('shared/JobSummaryIA').then((val) => {
    console.log('loaded jobSummaryIA')
})

// interface ExpandMoreProps extends IconButtonProps {
//     expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));


// const JobSearchResult = ({ job, onApply }: { job: JobOpportunity, onApply: (jobId: string) => void }) => {
//     const [expanded, setExpanded] = React.useState(false);

//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     };

//     return (
//         <Card sx={{ maxWidth: 800 }}>
//             <CardContent>
//                 <Stack direction="row" justifyContent={'space-between'}>
//                     <React.Suspense fallback={'loading'}>
//                         <JobSummaryIA {...job} />
//                     </React.Suspense>
//                     <ExpandMore
//                         expand={expanded}
//                         onClick={handleExpandClick}
//                         aria-expanded={expanded}
//                         aria-label="show more"
//                     >
//                         <ExpandMoreIcon />
//                     </ExpandMore>
//                 </Stack>

//             </CardContent>
//             <Collapse in={expanded} timeout="auto" unmountOnExit>
//                 <CardContent sx={{ textAlign: 'left' }}>
//                     {job.description}
//                 </CardContent>
//                 <CardActions>
//                     <Button onClick={() => { onApply(job.id) }}>Apply</Button>
//                 </CardActions>
//             </Collapse>

//         </Card >
//     )
// }

// export default JobSearchResult
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const JobSearchInput = React.lazy(() => import("job_search/JobSearchInput"))
const AddResumeButton = React.lazy(() => import('my_profile/AddResumeButton'))

export interface HeaderProps {
    title: string
}

// DANGEROUS PATTERN:
// By moving the job application function up to a root component,
// we are exposing this function for other domains.
// Since applying for a job and searching for a job are inherently
// in a more similar domain, we should give them the flexibility
// to be more tightly coupled

const applyJob = async (jobId: string) => {
    const { ApplicationService } = await import('application_tracking/ApplicationService')
    console.log(ApplicationService)
    await ApplicationService.applyJob(jobId, 'test')
}


export default function Header({ title }: HeaderProps) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Stack direction="row" gap={2}>
                        <React.Suspense fallback={"loading"}>
                            <AddResumeButton />
                        </React.Suspense>
                        <React.Suspense fallback={"loading"}>
                            <JobSearchInput onApply={applyJob} />
                        </React.Suspense>
                    </Stack>
                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search???"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
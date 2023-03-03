import React, { useEffect, useRef, useState } from 'react'


import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { isEqual } from 'lodash';
import { alpha, styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import './search.scss';

export enum SearchFields {
    keyword = 'keyword',
    keyword2 = 'keyword2'
}
export interface SearchProps {
    fields: SearchFields[],
    onInputChange: (params: { [key: string]: string | number | boolean }) => void,
    results: Array<{ title: string }>
}
export interface SearchResult {
    title: string;
}
const Search = ({ fields, onInputChange, results }: SearchProps) => {

    const searchDebounceTimer = useRef<number>()

    const [searchParams, setSearchParams] = useState<{ [key: string]: string | number | boolean }>({})

    const lastSearchParams = useRef<{ [key: string]: string | number | boolean }>({})

    useEffect(() => {
        return () => clearTimeout(searchDebounceTimer.current)
    }, [])

    useEffect(() => {
        if (!isEqual(lastSearchParams.current, searchParams)) {
            lastSearchParams.current = searchParams;
            onInputChange(lastSearchParams.current)
        }
    }, [searchParams, onInputChange])

    const fieldComponents: { [key: string]: React.ReactNode } = {
        [SearchFields.keyword2]: (
            <Autocomplete
                freeSolo
                disableClearable
                filterOptions={(x) => x}
                options={results.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
                onInputChange={(event, newInputValue: string) => {
                    clearTimeout(searchDebounceTimer.current)
                    searchDebounceTimer.current = window.setTimeout(() => {
                        setSearchParams((p) => {
                            return {
                                ...p,
                                keyword: newInputValue
                            }
                        })
                    }, 200)
                }}
            />
        ),

        [SearchFields.keyword]: (

            <div data-component="search-box">
                <InputBase placeholder='Search Jobs' onChange={(evt) => {
                    const newInputValue = evt.target.value;
                    clearTimeout(searchDebounceTimer.current)
                    searchDebounceTimer.current = window.setTimeout(() => {
                        setSearchParams((p) => {
                            return {
                                ...p,
                                keyword: newInputValue
                            }
                        })
                    }, 200)
                }} />
            </div>
        )
    }

    return (
        <div data-test-component="shared-search">
            {
                fields.map((field) => {
                    return <React.Fragment key={field}>{fieldComponents[field] ?? undefined}</React.Fragment>
                })
            }
        </div>
    )
}

export default Search;



const SearchIpt = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderWidth: 2,
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
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
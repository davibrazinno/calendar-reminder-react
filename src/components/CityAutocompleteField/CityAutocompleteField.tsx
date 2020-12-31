import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import {InputProps} from "@material-ui/core";

const autocompleteService = {current: null};

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

interface PlaceType {
    description: string;
    place_id: string;
    structured_formatting: {
        main_text: string;
        secondary_text: string;
        main_text_matched_substrings: [
            {
                offset: number;
                length: number;
            }
        ];
    };
}

interface ICityAutocompleteField {
    onCitySelected: any,
    initialValue: string
}

export const CityAutocompleteField: React.FC<ICityAutocompleteField> = (props) => {
    const {onCitySelected} = props
    const classes = useStyles();
    const [value, setValue] = React.useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<PlaceType[]>([]);


    const fetch = React.useMemo(
        () =>
            throttle((request: { input: string, types: string[] }, callback: (results?: PlaceType[]) => void) => {
                (autocompleteService.current as any).getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && (window as any).google) {
            autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({input: inputValue, types: ['(cities)']}, (results?: PlaceType[]) => {
            if (active) {
                let newOptions = [] as PlaceType[];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            data-testid='CityAutocompleteField'
            style={{marginBottom: '15px'}}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            autoComplete placeholder='ddd'
            includeInputInList
            filterSelectedOptions
            onChange={(event: any, newValue: PlaceType | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
                if (newValue) {
                    onCitySelected({
                        label: newValue.description,
                        name: newValue.structured_formatting.main_text,
                        placeId: newValue.place_id
                    })
                }
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...{...params, inputProps: {...params.inputProps, 'data-testid': 'CityInput'}}} label={`Where? ${props.initialValue}`} fullWidth />
            )}
            renderOption={(option) => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match: any) => [match.offset, match.offset + match.length]),
                );

                return (
                    <Grid container alignItems="center" data-testid='autocomplete-option'>
                        <Grid item>
                            <LocationOnIcon className={classes.icon}/>
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>
                  {part.text}
                </span>
                            ))}
                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}

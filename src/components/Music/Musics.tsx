import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/redux-store";
import { getCurrentPage, getFilter, getIsFaching, getMusicPop, getPageSize } from "../../redux/music-selectors";
import { FilterType, requestMusic } from "../../redux/music-reducer";
import withAuthTest from "../../hoc/withAuthTest";
import { Music } from "./Music";
import Preloader from "../common/Preloader/Preloader";
import { MusicForm } from "./MusicForm";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";


type PropsType = {};

export const Musics:FC<PropsType> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const musicPop = useAppSelector(getMusicPop);
    const pageSize = useAppSelector(getPageSize);
    const currentPage = useAppSelector(getCurrentPage);
    const filter = useAppSelector(getFilter);
    const isFaching = useAppSelector(getIsFaching)

    useEffect(() => {
        const parse = queryString.parse(location.search);

        let actualFilter = filter;
        if(parse.term) actualFilter = {...actualFilter, term: parse.term as string};
        if(parse.friend) actualFilter = {...actualFilter, friend: parse.friend === 'true' ? true : false}

        dispatch(requestMusic(pageSize, currentPage, actualFilter));
    }, []);


    type QueryType = {term?: string, friend?: string}
    useEffect(() => {
        const query:QueryType = {}

        if(filter.term) query.term = filter.term;
        if(filter.friend !== null) query.friend = String(filter.friend);

        navigate({
            pathname: '/music',
            search: queryString.stringify(query)
        })

    }, [filter]);



    const onSerchChange = (filter: FilterType) => {
        dispatch(requestMusic(pageSize, currentPage, filter));
    }

    return <>
        {
            isFaching && <Preloader />
        }
        <MusicForm onSerchChange={onSerchChange} />
        {
            musicPop.map(music => <Music {...music} />)
        }
    </>
};

export const MusicsRedirect = withAuthTest(Musics);

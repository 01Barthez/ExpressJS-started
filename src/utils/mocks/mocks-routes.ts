const ROUTES = {
    USER: {
        // After the root user/
        INSCRIPTION: '/signup',
        CONNEXION: '/login',
        DECONNEXION: '/logout',
        GET_USER: '/profile/:userID',
        UPDATE_USER: '/profile/:userID',
        DELETE_USER: '/profile/:userID',
        REFRESH_TOKEN: '/refresh/:userID',
    },
    
    ITEM: {
        // After the root item/
        CREATE_ONE_ITEM: '/',
        CREATE_MANY_ITEM: '/',
        GET_ONE_ITEM: '/:itemID',
        GET_MANY_ITEM: '/',
        UPDATE_ITEM: '/itemID',
        DELETE_ONE_ITEM: '/itemID',
        DELETE_MANY_ITEM: '/',
    },
    
    UPLOAD: {
        UPLOAD: '/upload',
    }
}

export default  ROUTES;
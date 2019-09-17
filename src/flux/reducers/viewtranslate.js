import C from '../actions/constants';

export default function (state = {}, action) {
    switch (action.type) {
        case C.FETCH_TRANSLATIONS:
                if(action.payload && Array.isArray(action.payload)){
                    action.payload.map((t)=>{
                        var myDate = new Date(t.created_on + ' GMT');
                        t.created_on = (myDate.toLocaleString('en-US', {day:'numeric',month:'numeric',year:'numeric', hour: 'numeric', minute: 'numeric',second:'numeric', hour12: false }))   
                    })
                }
            return action.payload;
        default:
            return state;
    }
}

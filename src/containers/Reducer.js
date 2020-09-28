import * as ActionType from '../ActionTypes';

const initialState = {
    formDetails: [],
    componentOptions: ["Select Dropdwon", "Text", "Radio", "Static"],
}
const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.ADD_COMPONENT:
            return {
                ...state,
                formDetails: state.formDetails.concat([{}])
            }
        case ActionType.REMOVE_COMPONENT:
            return {
                ...state,
                formDetails: state.formDetails.filter((s, sidx) => action.payload !== sidx)
            }
        case ActionType.ADD_RADIO:
            const add_radio1 = state.formDetails.map((form, sidx) => {
                if (action.idx !== sidx) return form;
                return { ...form, [action.idx]: state.formDetails[action.idx][action.idx].concat([{ value: '' }]) };
            });
            return {
                ...state,
                formDetails: add_radio1
            }

        case ActionType.CHANGE_RADIO:
            const change_radio = state.formDetails.map((form, sidx) => {
                if (action.payload.idx !== sidx) return form;
                return form[action.payload.idx].map((option, index) => {
                    if(action.payload.index == index){
                        let updatedValue = form[action.payload.idx][index];
                        updatedValue.value = action.payload.value
                        return { ...form, [action.payload.idx]: updatedValue }; 
                    }
                })
            });
            console.log('change_radio', change_radio)
            return {
                ...state
            }
        case ActionType.TEXT:
            let text = action.payload.name;
            let text_value = action.payload.value;
            let text_form_details = state.formDetails.map((form, sidx) => {
                if (action.payload.idx !== sidx) return form;
                return { ...form, [text]: text_value, question: '', allowCharacter: '' };
            });
            return {
                ...state,
                formDetails: text_form_details
            }
        case ActionType.RADIO:
            let radio = action.payload.name;
            let radio_value = action.payload.value;
            let radio_form_details = state.formDetails.map((form, sidx) => {
                if (action.payload.idx !== sidx) return form;
                return { ...form, [radio]: radio_value, question: '', [action.payload.idx]: [{ value: '' }] };
            });
            return {
                ...state,
                formDetails: radio_form_details
            }
        case ActionType.STATIC:
            let charset = "abcd suryaefg hijkl kantmnlo qrst uvwx yz".match(/./g);
            let static_text = "";
            for (var i = 0; i < charset.length; i++) static_text += charset[Math.floor(Math.random() * charset.length)];
            let static_name = action.payload.name;
            let static_value = action.payload.value;
            let static_form_details = state.formDetails.map((form, sidx) => {
                if (action.payload.idx !== sidx) return form;
                return { ...form, [static_name]: static_value, static: static_text };
            });
            return {
                ...state,
                formDetails: static_form_details
            }
        case ActionType.CHANGE_INPUT:
            let change_name = action.payload.name;
            const change_form_details = state.formDetails.map((form, sidx) => {
                if (action.payload.idx !== sidx) return form;
                return { ...form, [change_name]: action.payload.value };
            });
            return {
                ...state,
                formDetails: change_form_details
            }
        case ActionType.DOWNLOAD_JSON:
            let from_data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.formDetails));
            let a = document.createElement('a');
            a.href = 'data:' + from_data;
            a.download = 'from_data.json';
            a.click();
            return state;
        default:
            return state;
    }
}
export default formReducer;

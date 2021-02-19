import { Reducer } from 'redux';
import { ErrorTypes } from '../metaTypes/error';
import { QasAction, QasState, QasTypes } from '../metaTypes/qas';

const initialState: QasState = {
    items: [
        { question: 'Lorem ipsum dolor sit amet, adipiscing elit, Ut enim ad minim veniam?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', status: false},
        { question: 'Lorem ipsum dolor sit amet, adipiscing elit, Ut enim ad minim veniam?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', status: false},
        { question: 'Lorem ipsum dolor sit amet, adipiscing elit, Ut enim ad minim veniam?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', status: false},
    ],
    topic: [
        { title: 'topic 1', selected: false },
        { title: 'topic 2', selected: false },
        { title: 'topic 3', selected: false },
    ],
    loading: false
};

const questionAndAnswer: Reducer<QasState, QasAction> = (state = initialState, action: QasAction) => {
  switch (action.type) {
        case QasTypes.SET_QAS_TOPIC_SELECTED:
            let newListTopic: any[] = state.topic;
            newListTopic[action.payload.id].selected = !action.payload.selected;
            return {
                ...state, 
                topic: newListTopic,
                loading: false
            };
        case QasTypes.SET_LOADING:
            return {
                ...state, 
                loading: true,
            };
        case ErrorTypes.REQUEST_CLEAR_USER:
            return {
                ...state, 
                error: null,
                loading: false,
            };
        default:
            return state;
  }
};

export default questionAndAnswer;
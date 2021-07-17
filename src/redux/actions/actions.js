import { fetchQuestions } from '../../services/triviaAPI';
import shuffle from '../../helpers/shuffle';

export const SAVE_USER = 'SAVE_USER';
export const GET_QUESTIONS_SUCCESS = 'GET_API_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_API_ERROR';
export const GET_QUESTIONS = 'GET_API';
export const SET_ANSWER_VISIBILITY = 'SET_ANSWER_VISIBILITY';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const LAST_QUESTION = 'LAST_QUESTION';
export const SET_TIME = 'SET_TIME';
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const RESET_TIMER = 'RESET_TIMER';

export const saveUser = (user) => ({
  type: SAVE_USER,
  payload: user,
});

const getQuestions = () => ({
  type: GET_QUESTIONS,
});

export const getQuestionsSuccess = (payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
});

export const getQuestionsError = (payload) => ({
  type: GET_QUESTIONS_ERROR,
  payload,
});

export const getQuestionsThunk = () => async (dispatch) => {
  dispatch(getQuestions());

  try {
    const fetch = await fetchQuestions();

    const questions = fetch.map((question) => ({
      ...question,
      aleatory_answers: shuffle([
        ...question.incorrect_answers,
        question.correct_answer]) }));

    dispatch(getQuestionsSuccess(questions));
  } catch (error) {
    dispatch(getQuestionsError(error));
  }
};

export const setAnswerVisibility = (visibility) => ({
  type: SET_ANSWER_VISIBILITY,
  payload: visibility,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const lastQuestion = (redirect) => ({
  type: LAST_QUESTION,
  payload: redirect,
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

const startTimer = (timerID) => ({
  type: START_TIMER,
  payload: timerID,
});

const setTime = () => ({
  type: SET_TIME,
});

export const timerThunk = () => (dispatch) => {
  const TIMER_DELAY = 1000;
  const timerID = setInterval(() => {
    dispatch(setTime());
  }, TIMER_DELAY);

  dispatch(startTimer(timerID));
};

export const stopTimer = () => ({
  type: STOP_TIMER,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});

export default getQuestions;

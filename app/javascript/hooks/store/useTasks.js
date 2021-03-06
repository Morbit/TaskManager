import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/TasksSlice';
import { STATES } from 'presenters/TaskPresenter';

const useTasks = () => {
  const board = useSelector((state) => state.TasksSlice.board);
  const task = useSelector((state) => state.TasksSlice.task);
  const { loadColumn, loadColumnMore, taskDestroy, loadTask, updateTask, createTask } = useTasksActions();
  const loadBoard = () => Promise.all(STATES.map(({ key }) => loadColumn(key)));

  return {
    board,
    loadBoard,
    loadColumnMore,
    taskDestroy,
    loadTask,
    task,
    updateTask,
    loadColumn,
    createTask,
  };
};

export default useTasks;

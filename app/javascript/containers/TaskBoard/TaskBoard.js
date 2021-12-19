import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import '@asseinfo/react-kanban/dist/styles.css';

import TaskPresenter from 'presenters/TaskPresenter';
import TaskForm from 'forms/TaskForm';

import Task from 'components/Task';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';
import ColumnHeader from 'components/ColumnHeader';

import useTasks from 'hooks/store/useTasks';

const MODES = {
  ADD: 'add',
  NONE: 'none',
  EDIT: 'edit',
};

const TaskBoard = () => {
  const { board, loadBoard, loadColumnMore, loadTask, taskDestroy, updateTask, loadColumn, createTask } = useTasks();
  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);

  useEffect(() => {
    loadBoard();
  }, []);

  const handleOpenAddPopup = () => {
    setMode(MODES.ADD);
  };

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  const handleCardDragEnd = (task, source, destination) => {
    const transition = TaskPresenter.transitions(task).find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return updateTask(TaskPresenter.id(task), { stateEvent: transition.event }).then(() => {
      loadColumn(destination.toColumnId);
      loadColumn(source.fromColumnId);
    });
  };

  const handleTaskCreate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);
    return createTask(attributes).then(() => {
      loadColumn('new_task');
      handleClose();
    });
  };

  const handleTaskLoad = (id) => loadTask(id);

  const handleTaskUpdate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);
    return updateTask(task.id, attributes).then(() => {
      handleClose();
      loadBoard();
    });
  };

  const handleTaskDestroy = (id) =>
    taskDestroy(id).then(() => {
      handleClose();
      loadBoard();
    });

  return (
    <>
      <Fab onClick={handleOpenAddPopup} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <KanbanBoard
        disableColumnDrag
        onCardDragEnd={handleCardDragEnd}
        renderCard={(card) => <Task onClick={handleOpenEditPopup} task={card} key={card.id} />}
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={loadColumnMore} />}
      >
        {board}
      </KanbanBoard>

      {mode === MODES.ADD && <AddPopup onCreateCard={handleTaskCreate} onClose={handleClose} />}
      {mode === MODES.EDIT && (
        <EditPopup
          onLoadCard={handleTaskLoad}
          onCardDestroy={handleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onClose={handleClose}
          cardId={openedTaskId}
        />
      )}
    </>
  );
};

export default TaskBoard;

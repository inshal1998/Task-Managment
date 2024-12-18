import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Task, updateTask} from '../../store/task-Slice';
import {AppDispatch} from '../../store/store';

export const useUpdateTask = (initialTask: Task) => {
  const dispatch = useDispatch<AppDispatch>();

  const [taskDetails, setTaskDetails] = useState<Task>(initialTask);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTaskDetails = () => {
    setLoading(true);
    dispatch(updateTask({id:taskDetails._id , updatedFields:taskDetails}));
  };

  useEffect(() => {
    setTaskDetails(initialTask);
  }, [initialTask]);

  return {
    taskDetails,
    setTaskDetails,
    updateTaskDetails,
    loading,
    error,
  };
};

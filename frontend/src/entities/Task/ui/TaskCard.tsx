import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Task.module.scss'
import {FC, memo} from "react";
import {ITask} from "../model/types/task";
import {TaskPriority} from "@/entities/Task";
import {Text} from "@/shared/ui/Text/Text";

interface TaskProps {
    className?: string;
    task: ITask ;
}

export const TaskCard: FC<TaskProps> = memo((props) => {
    const {
        className = '',
        task
    } = props;

    // console.log(task);

    return (
        <div className={classNames(cls.Task, {}, [className, cls[task.priority]])}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className={cls.dateWrapper} style={{display: "flex"}}> <Text title={'Deadline:'}/> <Text text={new Date(task.deadlineTime).toLocaleDateString('en-GB')}/></div>

        </div>
    );
});

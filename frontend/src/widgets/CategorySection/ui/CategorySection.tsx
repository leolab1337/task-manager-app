import { useMemo, useCallback, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./CategorySection.module.scss";
import { AccordionSection } from "@/shared/ui/AccordionSection";
import { TaskCard } from "@/entities/Task";
import { ICategory } from "@/entities/Category";
import {DeleteTaskButton} from "@/features/DeleteTaskById";
import {UpdateTaskButton} from "@/features/UpdateTaskById";
import {UpdateCategoryButton} from "@/features/UpdateCategoryById";
import {DeleteCategoryButton} from "@/features/DeleteCategoryById";

interface CategorySectionProps {
    className?: string;
    category: ICategory;
}


export const CategorySection = ( props : CategorySectionProps) => {
    const {className, category } = props;
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onCollapse = useCallback(() => {
        setIsCollapsed(!isCollapsed);
    }, [isCollapsed]);

    //  the tasks array's memoization is necessary to prevent the TaskCard component from re-rendering
    const tasks = useMemo(() => category.tasks ?? [], [category.tasks]);

    return (
        <div className={classNames(cls.CategorySection, {}, [className])}>
            <AccordionSection
                className={cls.Category}
                title={`Category: ${category.taskCategoryName}`}
                isCollapsed={isCollapsed}
                onCollapse={onCollapse}
            >
                <div className={cls.categoryContent}>
                    {tasks.map((task) => (
                        <div key={task._id} className={cls.tasks}>
                            <TaskCard task={task} key={task._id} className={cls.taskCard} />
                            <div className={cls.cardButtons}>
                                <UpdateTaskButton taskId={task._id}  className={cls.updateCardButton} />
                                <DeleteTaskButton taskId={task._id} className={cls.deleteCardButton} />
                            </div>
                        </div>
                    ))}
                </div>
            </AccordionSection>
            <div className={cls.categoryButtons}>
                <UpdateCategoryButton categoryId={category._id} className={cls.updateCategoryButton}/>
                <DeleteCategoryButton categoryId={category._id} className={cls.deleteCategoryButton}/>
            </div>
        </div>
    );
};


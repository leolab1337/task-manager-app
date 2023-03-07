import {ThemeSwitcher} from "@/features/ThemeSwitcher";
import {Input, InputTheme} from "@/shared/ui/Input/Input";
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {ChangeEvent, useState} from "react";
import {ISelectOption, Select, SelectTheme} from "@/shared/ui/Select/Select";
import {ITask, TaskCard, TaskPriority} from "@/entities/Task";
import {ICategory} from "@/entities/Category";
import {CategorySection} from "@/widgets/CategorySection";

const MainPage = () => {

    const [value, setValue] = useState('');

    const handleChange = (e: any) => {
        setValue(e.target.value);
    }

    const options : Array<ISelectOption> = [
        { label: "perkele", value: "perkele" },
        { label: "saatana", value: "saatana" }
    ]




    const tasks : ITask[] = [
        { _id: '1', taskCategory: '1', user: '1', priority: TaskPriority.low, title: 'My super task', description: 'Here is some description of my task', deadlineTime: new Date('2023-12-17T13:24:00') },
        { _id: '2', taskCategory: '1', user: '1', priority: TaskPriority.medium, title: 'My second task', description: 'Here is some description second task', deadlineTime: new Date('2023-07-23T04:10:00') },
        { _id: '3', taskCategory: '1', user: '1', priority: TaskPriority.high, title: 'My third task', description: 'Fuck this shit', deadlineTime: new Date('2024-01-5:56:00') }
    ];

    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
          <div>

              <br/>

          </div>
            <Input theme={InputTheme.BACKGROUND_INVERTED} value={value} onChange={handleChange} placeholder='kek'/><br/><br/>
            <Button theme={ButtonTheme.BACKGROUND_INVERTED}> lol </Button><br/><br/>
            <Select theme={SelectTheme.BACKGROUND_INVERTED} options={ options } value={selectedOption} onChange={handleSelectChange} /><br/>
            <TaskCard task={tasks[1]}/>
            {value}
            {selectedOption}
            <CategorySection category={categories[0]}/>

        </>
    );
};

export default MainPage;


const categories: ICategory[] = [{
    _id: "6405482fff6cf8525b4db93a",
    taskCategoryName: "qeee",
    user: {
        _id: "64054822ff6cf8525b4db937",
        username: "Leo",
        role: "admin"
    },
    tasks: [
        {
            "_id": "6405485eff6cf8525b4db949",
            "title": "My Task1",
            "description": "This is a test task",
            "deadlineTime": new Date("2024-03-08T09:00:00.000Z"),
            "priority": TaskPriority.medium,
            "user": '64054822ff6cf8525b4db937',
            "taskCategory": '6405482fff6cf8525b4db93a'
        },
        {
            "_id": "6405485eff6cf8525b4db949",
            "title": "My Task2",
            "description": "This is a test task",
            "deadlineTime": new Date("2024-03-08T09:00:00.000Z"),
            "priority": TaskPriority.low,
            "user": '64054822ff6cf8525b4db937',
            "taskCategory": '6405482fff6cf8525b4db93a'
        }
    ],
    __v: 0
},
    {
        _id: "6405482fff6cf8525b4db10a",
        taskCategoryName: "qeee",
        user: {
            _id: "64054822ff6cf8525b4db937",
            username: "Leo",
            role: "admin"
        },
        tasks: [
            {
                "_id": "6405485eff6cf8525b4db949",
                "title": "My Task",
                "description": "This is a test task",
                "deadlineTime": new Date("2024-03-08T09:00:00.000Z"),
                "priority": TaskPriority.medium,
                "user": '64054822ff6cf8525b4db937',
                "taskCategory": '6405482fff6cf8525b4db93a'
            }
        ],
        __v: 0
    },
];

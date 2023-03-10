import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CategorySection } from "./CategorySection";
import { ICategory } from "@/entities/Category";
import { createCategory } from "@/shared/lib/tests/mockData/createCategory";
import {StoreDecorator} from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
    title: "widgets/CategorySection",
    component: CategorySection,
} as ComponentMeta<typeof CategorySection>;

const Template: ComponentStory<typeof CategorySection> = (args) => (
    <CategorySection {...args} />
);

const category: ICategory = createCategory();

export const Default = Template.bind({});
Default.args = {
    category,
};
Default.decorators = [StoreDecorator({
    user: { user: {username: 'tester', createdAt: '2023-03-09T19:56:26.883Z' , role: 'admin', _id: '1'}, token: 'teeest' },
})];

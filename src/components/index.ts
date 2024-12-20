import { Text } from "./text"
import { DashboardTotalCountCard } from './home/total-count-card'
import { DashboardLatestActivities } from "@/components/home/latest-activities"

import DealsChart from "./home/deals-chart";
import UpcomingEvents from "./home/upcoming-events";
import KanbanColumnSkeleton from "./skeleton/kanban";
import ProjectCardSkeleton from "./skeleton/project-card";
import UpcomingEventsSkeleton from "./skeleton/upcoming-events";
import AccordionHeaderSkeleton from "./skeleton/accordion-header";




export {
    Text,
    DealsChart,
    UpcomingEvents,
    ProjectCardSkeleton,
    KanbanColumnSkeleton,
    UpcomingEventsSkeleton,
    AccordionHeaderSkeleton,
    DashboardTotalCountCard,
    DashboardLatestActivities
}

export * from './accordion'
export * from './tags/user-tag';
export * from "./tasks/form/stage";
export * from "./tasks/form/title";
export * from "./tasks/form/users";
export * from "./tasks/form/header";
export * from "./tasks/form/due-date";
export * from "./tasks/form/description";

import { CalendarOutlined } from '@ant-design/icons'
import { Badge, Card, List, Skeleton as AntdSkeleton } from 'antd'
import { Text } from '../text'
import { useList } from '@refinedev/core'
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries'
import dayjs from 'dayjs'

interface Event {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    color: string;
}

const UpcomingEvents = () => {
    const { data, isLoading } = useList<Event>({
        resource: 'events',
        pagination: { pageSize: 5 },
        sorters: [
            {
                field: 'startDate',
                order: 'asc'
            }
        ],
        filters: [
            {
                field: 'startDate',
                operator: 'gte',
                value: dayjs().format('YYYY-MM-DD')
            }
        ],
        meta: {
            gqlQuery: DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY
        }
    });

    return (
        <Card
            style={{
                height: "100%",
            }}
            headStyle={{ padding: "8px 16px" }}
            bodyStyle={{
                padding: "0 1rem",
            }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <CalendarOutlined />
                    <Text size="sm" style={{ marginLeft: ".7rem" }}>
                        Upcoming events
                    </Text>
                </div>
            }
        >
            {isLoading ? (
                <List
                    itemLayout="horizontal"
                    dataSource={Array.from({ length: 5 }).map((_, index) => ({
                        id: index,
                    }))}
                    renderItem={() => {
                        return (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Badge color="transparent" />}
                                    title={
                                        <AntdSkeleton.Button
                                            active
                                            style={{
                                                height: "14px",
                                            }}
                                        />
                                    }
                                    description={
                                        <AntdSkeleton.Button
                                            active
                                            style={{
                                                width: "300px",
                                                marginTop: "8px",
                                                height: "16px",
                                            }}
                                        />
                                    }
                                />
                            </List.Item>
                        );
                    }}
                />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={data?.data || []}
                    renderItem={(item) => {
                        const renderDate = () => {
                            const start = dayjs(item.startDate).format(
                                "MMM DD, YYYY - HH:mm",
                            );
                            const end = dayjs(item.endDate).format("MMM DD, YYYY - HH:mm");

                            return `${start} - ${end}`;
                        };

                        return (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Badge color={item.color} />}
                                    title={<Text size="xs">{`${renderDate()}`}</Text>}
                                    description={
                                        <Text ellipsis={{ tooltip: true }} strong>
                                            {item.title}
                                        </Text>
                                    }
                                />
                            </List.Item>
                        );
                    }}
                />
            )}

            {!isLoading && data?.data.length === 0 && <NoEvent />}
        </Card>
    );
};

const NoEvent = () => (
    <span
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "220px",
        }}
    >
        No Upcoming Event
    </span>
);
export default UpcomingEvents

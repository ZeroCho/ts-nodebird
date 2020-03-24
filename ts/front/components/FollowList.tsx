import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import React, { FC, memo } from 'react';
import User from '../../back/models/user';

interface Props {
  header: string,
  hasMore: boolean,
  onClickMore: () => void,
  data: User[],
  onClickStop: (id: number) => () => void,
}
const FollowList: FC<Props> = memo(({ header, hasMore, onClickMore, data, onClickStop }) => (
  <List
    style={{ marginBottom: '20px' }}
    grid={{ gutter: 4, xs: 2, md: 3 }}
    size="small"
    header={<div>{header}</div>}
    loadMore={hasMore && <Button style={{ width: '100%' }} onClick={onClickMore}>더 보기</Button>}
    bordered
    dataSource={data}
    renderItem={(item) => (
      <List.Item style={{ marginTop: '20px' }}>
        <Card actions={[<StopOutlined key="stop" onClick={onClickStop(item.id)} />]}>
          <Card.Meta description={item.nickname} />
        </Card>
      </List.Item>
    )}
  />
));

export default FollowList;

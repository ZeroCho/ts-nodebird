import React, { FC, memo } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import Post from '../../back/models/post';

interface Props {
  post: Post;
  onFollow: (id: number) => () => void;
  onUnfollow: (id: number) => () => void;
}

const FollowButton: FC<Props> = memo(({ post, onUnfollow, onFollow }) => {
  const { me } = useSelector((state) => state.user);
  return !me || post.User.id === me.id
    ? null
    : me.Followings && me.Followings.find((v) => v.id === post.User.id)
      ? <Button onClick={onUnfollow(post.User.id)}>언팔로우</Button>
      : <Button onClick={onFollow(post.User.id)}>팔로우</Button>;
});

export default FollowButton;

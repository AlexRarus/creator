import React, { useState, MouseEvent } from 'react';

import { RippleStyled, ReplyStyled } from './style';

interface IReply {
  id: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
  isRemoving: boolean;
}

class ReplyModel implements IReply {
  id: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
  isRemoving = false;

  constructor(top: number, right: number, bottom: number, left: number) {
    this.id = Math.random().toString();
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }
}

interface IProps {
  light?: boolean;
  disabled?: boolean;
}

export function Replies(props: IProps) {
  const { light = false, disabled = false } = props;
  const [element, refCallback] = useState<HTMLDivElement | null>(null);
  const [replies, setReplies] = useState<IReply[]>([]);

  const removeReply = (id: string) => {
    setReplies(replies.filter((item: IReply) => item.id !== id));
  };

  const startRemoveReply = (targetReplyId: string) => {
    setReplies(
      replies.map((item: IReply) => {
        const isTargetReply = item.id === targetReplyId;
        const removingReply = {
          ...item,
          isRemoving: true,
        };
        return isTargetReply ? removingReply : item;
      })
    );
  };

  const mouseDownHandler = (e: MouseEvent) => {
    if (!disabled) {
      const elementPosition = element ? element.getBoundingClientRect() : ({} as any);
      const top = e.clientY - elementPosition.y;
      const right = elementPosition.right - e.clientX;
      const bottom = elementPosition.bottom - e.clientY;
      const left = e.clientX - elementPosition.x;
      const repl = new ReplyModel(top, right, bottom, left);
      setReplies([...replies, repl]);
    }
  };

  const mouseUpHandler = () => {
    const lastReply = replies[replies.length - 1];
    if (lastReply) {
      startRemoveReply(lastReply.id);
    }
  };

  const transitionEndHandler = (e: any) => {
    removeReply(e.target.id);
  };

  return (
    <RippleStyled onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} ref={refCallback}>
      {replies.map(({ id, ...position }: IReply) => (
        <ReplyStyled
          key={id}
          id={id}
          {...position}
          maxCoordinate={Math.max(position.top, position.right, position.bottom, position.left)}
          onTransitionEnd={transitionEndHandler}
          light={light}
        />
      ))}
    </RippleStyled>
  );
}

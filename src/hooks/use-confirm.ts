"use client";

import * as React from "react";

type ConfirmProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmerToast = ConfirmProps & {
  id: string;
  open: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type Action =
  | { type: "ADD_CONFIRM"; confirm: ConfirmerToast }
  | { type: "REMOVE_CONFIRM"; confirmId?: string }
  | { type: "UPDATE_CONFIRM"; confirm: { id: string; open: boolean } };

interface State {
  confirms: ConfirmerToast[];
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_CONFIRM":
      return { ...state, confirms: [...state.confirms, action.confirm] };
    case "REMOVE_CONFIRM":
      return {
        ...state,
        confirms: state.confirms.filter((c) => c.id !== action.confirmId),
      };
    case "UPDATE_CONFIRM":
      return {
        ...state,
        confirms: state.confirms.map((c) =>
          c.id === action.confirm.id ? { ...c, ...action.confirm } : c,
        ),
      };
    default:
      return state;
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { confirms: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function confirm({
  title = "Are you sure?",
  description = "Are you sure you want to perform this action?",
  ...props
}: ConfirmProps) {
  const id = genId();
  const dismiss = () => {
    dispatch({
      type: "REMOVE_CONFIRM",
      confirmId: id,
    });
  };

  dispatch({
    type: "ADD_CONFIRM",
    confirm: {
      ...props,
      title,
      description,
      id,
      open: true,
      onConfirm: async () => {
        await props.onConfirm?.();
        dispatch({
          type: "UPDATE_CONFIRM",
          confirm: { id, open: false },
        });
      },
      onCancel: async () => {
        await props.onCancel?.();
        dispatch({
          type: "UPDATE_CONFIRM",
          confirm: { id, open: false },
        });
      },
    },
  });

  return {
    id: id,
    dismiss,
  };
}

function useConfirm() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    confirm,
    dismiss: (confirmId?: string) =>
      dispatch({ type: "REMOVE_CONFIRM", confirmId }),
  };
}

export { useConfirm, confirm };

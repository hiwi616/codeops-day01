// Plain, standalone reducer: (state, action) -> newState, no React needed
// to test it. Cart items are { id, name, price, qty }.

export const initialCartState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const { id, name, price } = action.dish;
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }

      return { items: [...state.items, { id, name, price, qty: 1 }] };
    }

    case "remove": {
      return { items: state.items.filter((item) => item.id !== action.id) };
    }

    case "clear": {
      return { items: [] };
    }

    default:
      // Fail loudly on a typo'd action type rather than silently doing
      // nothing, so the mistake shows up immediately during development.
      throw new Error("Unknown action: " + action.type);
  }
}

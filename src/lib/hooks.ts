import { useEffect, useMemo, useState } from "react";

export const useToken = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("access_token") ?? "");
  }, []);

  return token;
};

// see https://github.com/tannerlinsley/react-query/issues/293
// see https://usehooks.com/useDebounce/
export function useDebounce(value: string, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

const useLocalStorage = (key: string, initialValue: any) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      let value;

      try {
        value = item ? JSON.parse(item) : initialValue;
      } catch {
        value = initialValue;
      }

      return value;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

// Design reference:
// https://recoiljs.org/docs/api-reference/core/useRecoilState

const chr4 = () => Math.random().toString(16).slice(-4);
const uuid = () =>
  `${chr4()}${chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;

// Subscribes to a readable state

export const useLocalValue = (key: string, initialValue: string) => {
  const id = useMemo(uuid, []);

  const [storedValue, setStoredValue] = useState(() => {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue

    let value;

    try {
      value = item ? JSON.parse(item) : initialValue || undefined;
    } catch {
      value = initialValue || undefined;
    }

    return value;
  });

  useEffect(() => {
    if (!(window as any)._localStorage) (window as any)._localStorage = {};
    if (!(window as any)._localStorage[key])
      (window as any)._localStorage[key] = {};
    (window as any)._localStorage[key][id] = (newValue: any) =>
      setStoredValue(newValue);

    return () => {
      delete (window as any)?._localStorage?.[key]?.[id];
    };
  }, []);

  return storedValue;
};

// Returns a setter function for updating the value of readble state.

export const useSetLocalState = (key: string) => {
  return (newValue: any) => {
    if ((window as any)?._localStorage?.[key])
      Object.keys((window as any)?._localStorage?.[key]).forEach((_id) => {
        (window as any)?._localStorage?.[key]?.[_id]?.(newValue);
        window.localStorage.setItem(key, JSON.stringify(newValue));
      });
    else {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    }
  };
};

// Returns a tuple where the first element is the value of state and the
// second element is a setter function that will update the value of the given state when called.

export const useLocalState = (key: string, initialValue: any) => {
  const value = useLocalValue(key, initialValue);
  const setValue = useSetLocalState(key);

  return [value, setValue];
};

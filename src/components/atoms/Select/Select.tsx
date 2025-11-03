import { useId, useState, useRef, useEffect } from "react";
import { Button, type ButtonProps } from "../Button/Button";
import { DropdownIcon } from "../Icons/DropdownIcon";
import styles from "./Select.module.css";
import clsx from "clsx";

export type SelectProps = ButtonProps & {
  options: { value: string; label: string }[];
} & (
    | {
        onChoose: (value: string[]) => void;
        multiselect: true;
      }
    | {
        onChoose: (value: string) => void;
        multiselect: false;
      }
  );

export const Select = ({
  onChoose,
  multiselect = false,
  options,
  children,
  ...buttonProps
}: SelectProps) => {
  const uniqueId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setDropdownOpened(false);
      }
    };

    if (dropdownOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpened]);

  const onValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (multiselect) {
      const selectedValues = Array.from(
        document.querySelectorAll(
          `input[name="select-option-${uniqueId}"]:checked`
        )
      ).map((input) => (input as HTMLInputElement).value);
      (onChoose as (value: string[]) => void)(selectedValues);
      setSelectedValues(selectedValues);
    } else {
      (onChoose as (value: string) => void)(value);
      setDropdownOpened(false);
      setSelectedValues([value]);
    }
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <Button
        onClick={() => setDropdownOpened(!dropdownOpened)}
        after={<DropdownIcon />}
        {...buttonProps}
      >
        {children}
      </Button>
      <div
        className={clsx(
          styles.dropdown,
          dropdownOpened && styles.dropdownOpened
        )}
      >
        <ul className={styles.optionsList} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.optionItem}
              role="option"
              aria-selected={selectedValues.includes(option.value)}
            >
              <input
                type={multiselect ? "checkbox" : "radio"}
                name={`select-option-${uniqueId}`}
                value={option.value}
                id={`select-option-${uniqueId}-${option.value}`}
                onChange={onValueChanged}
                className={styles.optionInput}
                aria-hidden={true}
              />
              <label htmlFor={`select-option-${uniqueId}-${option.value}`}>
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

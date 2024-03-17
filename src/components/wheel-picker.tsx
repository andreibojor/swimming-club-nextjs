// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const WheelPickerComponent = ({
  dateItems,
  dateValue,
  onDateChange: handleDateChange,
  hourItems,
  hourValue,
  onHourChange: handleHourChange,
  minuteItems,
  minuteValue,
  onMinuteChange: handleMinuteChange,
  ampmItems,
  ampmValue,
  onAmpmChange: handleAmpmChange,
  containerHeight = 200,
  itemHeight = 32,
}) => {
  const hourItemsContRef = useRef();
  const dateItemsContRef = useRef();
  const minuteItemsContRef = useRef();
  const ampmItemsContRef = useRef();
  const isScrolling = useRef(false);
  const dateRefs = useRef([]);
  const hourRefs = useRef([]);
  const minuteRefs = useRef([]);
  const ampmRefs = useRef([]);
  const dateItemsMap = useMemo(
    () =>
      dateItems.reduce(
        (map, item, index) => map.set(item.value, index),
        new Map(),
      ),
    [dateItems],
  );
  const currentDateValue = useRef(dateItemsMap.get(dateValue) ?? 0);
  const hourItemsMap = useMemo(
    () =>
      hourItems.reduce(
        (map, item, index) => map.set(item.value, index),
        new Map(),
      ),
    [hourItems],
  );
  const currentHourValue = useRef(hourItemsMap.get(hourValue) ?? 0);
  const minuteItemsMap = useMemo(
    () =>
      minuteItems.reduce(
        (map, item, index) => map.set(item.value, index),
        new Map(),
      ),
    [minuteItems],
  );
  const currentMinuteValue = useRef(minuteItemsMap.get(minuteValue) ?? 0);
  const ampmItemsMap = useMemo(
    () =>
      ampmItems.reduce(
        (map, item, index) => map.set(item.value, index),
        new Map(),
      ),
    [ampmItems],
  );
  const currentAmpmValue = useRef(ampmItemsMap.get(ampmValue) ?? 0);

  const visibleItemsCount = Math.floor(containerHeight / itemHeight);
  const offset = Math.round((visibleItemsCount + 1) / 2) + 1;
  const maxScrollOffset = (containerHeight - itemHeight) / 2;

  // State variables for storing selected values
  const [selectedDate, setSelectedDate] = useState(dateValue);
  const [selectedHour, setSelectedHour] = useState(hourValue);
  const [selectedMinute, setSelectedMinute] = useState(minuteValue);
  const [selectedAmpm, setSelectedAmpm] = useState(ampmValue);

  function rerenderDateElements(
    selectedElement,
    scrollTop,
    firstItemIndex = Math.max(selectedElement - offset, 0),
    lastItemIndex = Math.min(selectedElement + offset, dateItems.length),
  ) {
    if (dateRefs.current) {
      dateRefs.current
        .slice(firstItemIndex, lastItemIndex)
        .forEach((item, index) => {
          const realIndex = index + firstItemIndex;
          const scrollOffset = Math.min(
            Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
            maxScrollOffset,
          );
          const sin = scrollOffset / maxScrollOffset;
          const cos = Math.sqrt(1 - sin ** 2);
          const [div] = item.getElementsByTagName('div');
          div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
          div.style.transformOrigin = 'right';
        });
    }
  }

  function rerenderHourElements(
    selectedElement,
    scrollTop,
    firstItemIndex = Math.max(selectedElement - offset, 0),
    lastItemIndex = Math.min(selectedElement + offset, dateItems.length),
  ) {
    if (hourRefs.current) {
      hourRefs.current
        .slice(firstItemIndex, lastItemIndex)
        .forEach((item, index) => {
          const realIndex = index + firstItemIndex;
          const scrollOffset = Math.min(
            Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
            maxScrollOffset,
          );
          const sin = scrollOffset / maxScrollOffset;
          const cos = Math.sqrt(1 - sin ** 2);
          const [div] = item.getElementsByTagName('div');
          div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
          div.style.transformOrigin = 'center';
        });
    }
  }

  function rerenderMinuteElements(
    selectedElement,
    scrollTop,
    firstItemIndex = Math.max(selectedElement - offset, 0),
    lastItemIndex = Math.min(selectedElement + offset, dateItems.length),
  ) {
    if (minuteRefs.current) {
      minuteRefs.current
        .slice(firstItemIndex, lastItemIndex)
        .forEach((item, index) => {
          const realIndex = index + firstItemIndex;
          const scrollOffset = Math.min(
            Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
            maxScrollOffset,
          );
          const sin = scrollOffset / maxScrollOffset;
          const cos = Math.sqrt(1 - sin ** 2);
          const [div] = item.getElementsByTagName('div');
          div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
          div.style.transformOrigin = 'left';
        });
    }
  }

  function rerenderAmpmElements(
    selectedElement,
    scrollTop,
    firstItemIndex = Math.max(selectedElement - offset, 0),
    lastItemIndex = Math.min(selectedElement + offset, dateItems.length),
  ) {
    if (ampmRefs.current) {
      ampmRefs.current
        .slice(firstItemIndex, lastItemIndex)
        .forEach((item, index) => {
          const realIndex = index + firstItemIndex;
          const scrollOffset = Math.min(
            Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
            maxScrollOffset,
          );
          const sin = scrollOffset / maxScrollOffset;
          const cos = Math.sqrt(1 - sin ** 2);
          const [div] = item.getElementsByTagName('div');
          div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
          div.style.transformOrigin = 'left';
        });
    }
  }

  useEffect(() => {
    let isAnimating = false;

    function handleHourScroll(event) {
      if (!isAnimating) {
        isAnimating = true;

        requestAnimationFrame(() => {
          const scrollTop = Math.max(event.target.scrollTop, 0);
          const selectedElement = Math.min(
            Math.max(Math.floor(scrollTop / itemHeight), 0),
            hourItems.length - 1,
          );
          window.clearTimeout(isScrolling.current);
          rerenderHourElements(selectedElement, scrollTop);

          currentHourValue.current = selectedElement;
          isScrolling.current = setTimeout(function () {
            handleHourChange(hourItems[selectedElement].value);
          }, 20);

          isAnimating = false;
        });
      }
    }

    hourItemsContRef.current?.addEventListener('scroll', handleHourScroll);
    hourRefs.current[currentDateValue.current]?.scrollIntoView({
      block: 'center',
    });
    rerenderHourElements(
      currentHourValue.current,
      hourItemsContRef.current?.scrollTop,
      0,
      hourItems.length,
    );
    return () => {
      hourItemsContRef.current?.removeEventListener('scroll', handleHourScroll);
    };
  }, [hourItemsContRef.current]);

  useEffect(() => {
    let isAnimating = false;

    function handleDateScroll(event) {
      if (!isAnimating) {
        isAnimating = true;

        requestAnimationFrame(() => {
          const scrollTop = Math.max(event.target.scrollTop, 0);
          const selectedElement = Math.min(
            Math.max(Math.floor(scrollTop / itemHeight), 0),
            dateItems.length - 1,
          );
          window.clearTimeout(isScrolling.current);
          rerenderDateElements(selectedElement, scrollTop);

          currentDateValue.current = selectedElement;
          isScrolling.current = setTimeout(function () {
            handleDateChange(dateItems[selectedElement].value);
          }, 20);

          isAnimating = false;
        });
      }
    }

    dateItemsContRef.current?.addEventListener('scroll', handleDateScroll);
    dateRefs.current[currentDateValue.current]?.scrollIntoView({
      block: 'center',
    });
    rerenderDateElements(
      currentDateValue.current,
      dateItemsContRef.current?.scrollTop,
      0,
      dateItems.length,
    );

    return () => {
      dateItemsContRef.current?.removeEventListener('scroll', handleDateScroll);
    };
  }, [dateItemsContRef.current]);

  console.log(selectedDate);
  return (
    <div
      className="container-wheel after:right:0 relative flex w-52 after:absolute after:left-0 after:top-1/2 after:h-8 after:w-full after:rounded-sm after:bg-black"
      style={{
        height: `${containerHeight}px`,
      }}
    >
      <ul className="items" ref={dateItemsContRef}>
        {dateItems.map((item, index) => (
          <li
            className="item mr-2"
            key={item.value}
            ref={(node) => (dateRefs.current[index] = node)}
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}
          >
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
      <ul className="items" ref={hourItemsContRef}>
        {hourItems.map((item, index) => (
          <li
            className="item mr-2"
            key={item.value}
            ref={(node) => (hourRefs.current[index] = node)}
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}
          >
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
      <ul className="items" ref={minuteItemsContRef}>
        {minuteItems.map((item, index) => (
          <li
            className="item mr-2"
            key={item.value}
            ref={(node) => (minuteRefs.current[index] = node)}
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}
          >
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
      <ul className="items" ref={ampmItemsContRef}>
        {ampmItems.map((item, index) => (
          <li
            className="item mr-2"
            key={item.value}
            ref={(node) => (ampmRefs.current[index] = node)}
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}
          >
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const WheelPicker = React.memo(WheelPickerComponent);

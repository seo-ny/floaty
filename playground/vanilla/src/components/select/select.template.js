import * as Floaty from "floaty-core";

function createSelectComponent({
  options = [],
  placeholder = "선택해주세요.",
  onSelect = () => {},
  maxVisibleItems = 4
}) {
  const selectStyles = createSelectStyles();
  document.head.appendChild(selectStyles);

  const selectWrapper = document.createElement("div");
  selectWrapper.className = "select";

  const trigger = document.createElement("div");
  trigger.className = "select-trigger";
  trigger.textContent = placeholder;

  const dropdownMenu = document.createElement("div");
  dropdownMenu.className = "dropdown-menu";

  const menuList = document.createElement("ul");
  menuList.className = "menu-list";

  let isOpen = false;
  let onOpenCallback = null;
  let selectedValue = null;
  let selectedItem = null;

  function onTriggerClick() {
    toggleDropdown();
    scrollIntoSelectedOption(selectedValue);
  }

  function toggleDropdown() {
    isOpen = !isOpen;

    if (isOpen) {
      openDropdown(selectedItem);
    } else {
      closeDropdown();
    }

    dropdownMenu.style.maxHeight = getDropdownMaxHeight();
  }

  function openDropdown(selectedItem = null) {
    dropdownMenu.classList.add("open");
    updateSelectedItemStyles(selectedItem);

    if (typeof onOpenCallback === "function") {
      onOpenCallback();
    }
  }

  function closeDropdown() {
    dropdownMenu.classList.remove("open");
  }

  function getDropdownMaxHeight() {
    if (!isOpen) {
      return "none";
    }

    const firstMenuItem = menuList.children[0];

    if (firstMenuItem && maxVisibleItems < options.length) {
      return `${maxVisibleItems * firstMenuItem.getBoundingClientRect().height}px`;
    }
    return "none";
  }

  function updateSelectedItemStyles(selectedItem = null) {
    Array.from(menuList.children).forEach((item) => {
      item.classList.remove("selected");
    });

    if (selectedItem) {
      selectedItem.classList.add("selected");
    }
  }

  function scrollIntoSelectedOption(selectedValue = null) {
    const selectedOptionIndex = options.findIndex(
      ({ value }) => value === selectedValue
    );

    if (selectedOptionIndex !== -1) {
      menuList.children[selectedOptionIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }

  function handleOptionClick(option = {}, item = null) {
    selectedValue = option.value;
    selectedItem = item;
    trigger.textContent = option.label;

    updateSelectedItemStyles(selectedItem);
    toggleDropdown();

    if (selectedItem != null) {
      selectedItem.classList.add("selected");
    }

    if (typeof onSelect === "function") {
      onSelect(selectedValue);
    }
  }

  // dropdown 아이템 추가
  options.forEach((option) => {
    const item = document.createElement("li");
    item.className = "menu-item";
    item.textContent = option.label;
    item.addEventListener("click", () => handleOptionClick(option, item));

    menuList.appendChild(item);
  });

  trigger.addEventListener("click", onTriggerClick);

  dropdownMenu.appendChild(menuList);
  selectWrapper.appendChild(trigger);
  selectWrapper.appendChild(dropdownMenu);

  return {
    selectEl: selectWrapper,
    referenceEl: trigger,
    floatingEl: dropdownMenu,
    setOnOpenCallback: (fn) => {
      onOpenCallback = fn;
    }
  };
}

function createSelectStyles() {
  const style = document.createElement("style");

  style.textContent = `
    * {
      box-sizing: border-box;
    }
    .select {
      display: inline-block;
      position: relative;
      width: 140px;
    }
    .select-trigger {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 8px 12px;
      cursor: pointer;
      user-select: none;
      border-radius: 4px;
      background-color: lightsteelblue;
    }
    .dropdown-menu {
      overflow: auto;
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      padding: 2px 0;
      border-radius: 4px;
      background-color: lightblue;
      z-index: 10;
      transition: opacity 300ms ease;
    }
    .dropdown-menu.open {
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    }
    .dropdown-menu::-webkit-scrollbar {
      width: 9px;
      background-color: lightblue;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .dropdown-menu::-webkit-scrollbar-thumb {
      border: 3px solid lightblue;
      background-clip: padding-box;
      border-radius: 999px;
      background-color: white;
    }
    .menu-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .menu-item {
      padding: 8px 12px;
      border-radius: 8px;
      border-width: 2px 4px;
      border-style: solid;
      border-color: lightblue;
      cursor: pointer;
    }
    .menu-item.selected {
      background-color: white;
    }
    .menu-item:hover {
      background-color: lightcyan;
    }
  `;

  return style;
}

export const Template = (args = { select: {} }) => {
  const {
    select: { options, placeholder, onSelect, maxVisibleItems } = {},
    placement,
    strategy,
    boundary,
    rootBoundary,
    padding,
    behaviors
  } = args;
  const { selectEl, referenceEl, floatingEl, setOnOpenCallback } =
    createSelectComponent({
      options,
      placeholder,
      onSelect,
      maxVisibleItems
    });

  setOnOpenCallback(() => {
    Floaty.computePosition(referenceEl, floatingEl, {
      placement,
      strategy,
      boundary,
      rootBoundary,
      padding,
      behaviors
    });
  });

  return selectEl;
};

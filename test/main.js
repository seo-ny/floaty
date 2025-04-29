function createSelectComponent({
  options = [],
  placeholder = "선택해주세요.",
  onSelect = () => {},
  maxVisibleItems = 4
}) {
  const container = document.createElement("div");
  container.className = "select";

  const trigger = document.createElement("div");
  trigger.className = "select-trigger";
  trigger.textContent = placeholder;

  const dropdownMenu = document.createElement("div");
  dropdownMenu.className = "dropdown-menu";

  const menuList = document.createElement("ul");
  menuList.className = "menu-list";

  let isOpen = false;
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
  container.appendChild(trigger);
  container.appendChild(dropdownMenu);

  return container;
}

const select = createSelectComponent({
  options: [
    { value: "red", label: "빨간색" },
    { value: "green", label: "초록색" },
    { value: "blue", label: "파란색" },
    { value: "yellow", label: "노란색" },
    { value: "orange", label: "주황색" },
    { value: "purple", label: "보라색" },
    { value: "pink", label: "분홍색" },
    { value: "black", label: "검은색" },
    { value: "white", label: "흰색" },
    { value: "gray", label: "회색" },
    { value: "brown", label: "갈색" }
  ],
  placeholder: "색상을 선택하세요",
  onSelect: (value) => {
    console.log("[onSelect]", {
      value
    });
  },
  maxVisibleItems: 4
});

document.body.appendChild(select);

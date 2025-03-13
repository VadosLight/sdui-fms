import { useState, useEffect } from "react";
import { getElementById } from "@features/constructor/lib/getElementById";
import { Select } from "@alfalab/core-components/select";
import styles from "./StackWrapperForm.module.css";
import { Spacing } from "@model/types/fms/atoms/Spacing/Spacing";
import { ComponentProps } from "@model/types/utils/ComponentProps";
import { useVariants } from "@features/constructor/hooks/useVariants";
import { $spacings } from "@store/atoms/spacing";
import { IdEditor } from "@entities/constructor/ui/IdEditor/IdEditor";
import { EditComponentFormProps } from "@features/constructor/model/types/EditComponentFormProps";
import { LayoutElement } from "@model/types/fms/common/LayoutElement/LayoutElement";




export const StackWrapperForm = ({
    screen,
    id,
    setNewComponent,
}: EditComponentFormProps) => {
    // Получаем элемент и храним его в состоянии
    const [currentElement, setElement] = useState(
        getElementById(id, screen) as ComponentProps<"StackWrapper">
    );

    // Используем хук useVariants для получения вариантов отступов
    const sizeVariants = useVariants($spacings);

    const spacingOptions = sizeVariants.map(key => ({
        key,
        content: key
    }));


    // Обновляем компонент при изменении состояния
    useEffect(() => {
        if (currentElement) {
            setNewComponent(currentElement);
        }
    }, [currentElement, setNewComponent]);

    // Проверяем, что элемент существует
    if (!currentElement || currentElement.type !== "StackWrapper") {
        return null;
    }


    // Получаем текущие значения из элемента
    const {
        axis = "vertical",
        horizontalAlignment = "center",
        verticalAlignment = "center",
        distribution = "fill",
        spacing = "none",
        padding = {},
    } = currentElement.content;


    // Функция для безопасного обновления элемента
    const updateElement = (updater: (prev: ComponentProps<"StackWrapper">) => ComponentProps<"StackWrapper">) => {
        setElement((prev) => {
            if (!prev) return prev;
            return updater(prev);
        });
    };

    return (
        <div className={styles.form}>
            <div className={styles.formGroup}>
                <IdEditor id={currentElement.id} setElement={setElement as React.Dispatch<React.SetStateAction<LayoutElement>>} />

                <label className={styles.label}>Ось стека</label>
                <Select
                    block
                    options={[
                        { key: "horizontal", content: "Горизонтальная" },
                        { key: "vertical", content: "Вертикальная" },
                    ]}
                    selected={{ key: axis, content: axis }}
                    onChange={(option) => {
                        if (option.selected) {
                            updateElement((prev) => ({
                                ...prev,
                                content: {
                                    ...prev.content,
                                    axis: option.selected!.key as "horizontal" | "vertical",
                                },
                            }));
                        }
                    }}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Горизонтальное выравнивание</label>
                <Select
                    block
                    options={[
                        { key: "left", content: "Слева" },
                        { key: "center", content: "По центру" },
                        { key: "right", content: "Справа" },
                    ]}
                    selected={{ key: horizontalAlignment, content: horizontalAlignment }}
                    onChange={(option) => {
                        if (option.selected) {
                            updateElement((prev) => ({
                                ...prev,
                                content: {
                                    ...prev.content,
                                    horizontalAlignment: option.selected!.key as "left" | "right" | "center",
                                },
                            }));
                        }
                    }}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Вертикальное выравнивание</label>
                <Select
                    block

                    options={[
                        { key: "top", content: "Сверху" },
                        { key: "center", content: "По центру" },
                        { key: "bottom", content: "Снизу" },
                    ]}
                    selected={{ key: verticalAlignment, content: verticalAlignment }}
                    onChange={(option) => {
                        if (option.selected) {
                            updateElement((prev) => ({
                                ...prev,
                                content: {
                                    ...prev.content,
                                    verticalAlignment: option.selected!.key as "top" | "bottom" | "center",
                                },
                            }));
                        }
                    }}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Распределение</label>
                <Select
                    block

                    options={[
                        { key: "fill", content: "Заполнение" },
                        { key: "fillEqually", content: "Равномерное заполнение" },
                        { key: "spaceStart", content: "От начала" },
                        { key: "spaceEnd", content: "От конца" },
                        { key: "spaceBetween", content: "Между элементами" },
                    ]}
                    selected={{ key: distribution, content: distribution }}
                    onChange={(option) => {
                        if (option.selected) {
                            updateElement((prev) => ({
                                ...prev,
                                content: {
                                    ...prev.content,
                                    distribution: option.selected!.key as "fill" | "fillEqually" | "spaceStart" | "spaceEnd" | "spaceBetween",
                                },
                            }));
                        }
                    }}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Отступ между элементами</label>
                <Select
                    block

                    options={spacingOptions}
                    selected={{ key: spacing, content: spacing }}
                    onChange={(option) => {
                        if (option.selected) {
                            updateElement((prev) => ({
                                ...prev,
                                content: {
                                    ...prev.content,
                                    spacing: option.selected!.key as Spacing,
                                },
                            }));
                        }
                    }}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Внутренний отступ сверху</label>
                <Select block

                    options={spacingOptions}
                    selected={{ key: padding?.top || "none", content: padding?.top || "none" }}
                    onChange={(option) => {
                        if (option.selected) {
                            const value = option.selected.key as Spacing;
                            updateElement((prev) => ({
                                ...prev,
                                content: {
                                    ...prev.content,
                                    padding: {
                                        ...prev.content.padding,
                                        top: value !== "none" ? value : undefined,
                                    },
                                },
                            }));
                        }
                    }}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Внутренний отступ справа</label>
                <Select
                    block

                    options={spacingOptions}
                    selected={{ key: padding?.right || "none", content: padding?.right || "none" }}
                    onChange={(option) => {
                        if (option.selected) {
                            const value = option.selected.key as Spacing;
                            updateElement((prev) => ({
                                ...prev,
                                content: {
                                    ...prev.content,
                                    padding: {
                                        ...prev.content.padding,
                                        right: value !== "none" ? value : undefined,
                                    },
                                },
                            }));
                        }
                    }}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Внутренний отступ снизу</label>
                <Select
                    block

                    options={spacingOptions}
                    selected={{ key: padding?.bottom || "none", content: padding?.bottom || "none" }}
                    onChange={(option) => {
                        if (option.selected) {
                            const value = option.selected.key as Spacing;
                            updateElement((prev) => ({
                                ...prev,
                                content: {
                                    ...prev.content,
                                    padding: {
                                        ...prev.content.padding,
                                        bottom: value !== "none" ? value : undefined,
                                    },
                                },
                            }));
                        }
                    }}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Внутренний отступ слева</label>
                <Select
                    block

                    options={spacingOptions}
                    selected={{ key: padding?.left || "none", content: padding?.left || "none" }}
                    onChange={(option) => {
                        if (option.selected) {
                            const value = option.selected.key as Spacing;
                            updateElement((prev) => ({
                                ...prev,
                                content: {
                                    ...prev.content,
                                    padding: {
                                        ...prev.content.padding,
                                        left: value !== "none" ? value : undefined,
                                    },
                                },
                            }));
                        }
                    }}
                />
            </div>
        </div>
    );
}; 
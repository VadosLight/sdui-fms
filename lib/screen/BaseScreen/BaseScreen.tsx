import { Suspense } from "react";
import { DEFAULT_DS } from "../../utils/constants/defaults";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { renderComponent } from "../../utils/renderComponent";
import styles from "./BaseScreen.module.css"; // ✅ Импортируем стили

export type BaseScreenProps = {
  screen: SDUIScreen;
  designSystem?: string;
};

export const BaseScreen = (props: BaseScreenProps) => {
  const { designSystem = DEFAULT_DS, screen } = props;

  return (
    <div className={styles.baseScreenContainer}>
      <Suspense fallback={<div>Loading...</div>}>
        <header className={styles.header}>Header</header>{" "}
        {/* ✅ Фиксированный заголовок */}
        <main className={styles.mainContent}>
          {screen?.content.type === "list" &&
            screen.content.items.map((element) => {
              return renderComponent(element, designSystem);
            })}
        </main>
        <footer className={styles.footer}>Footer</footer>{" "}
      </Suspense>
    </div>
  );
};

// const getScreen = async (endpoint: string): Promise<SDUIScreen> => {
//   // const response =  axios.get(endpoint);
//   console.log({ endpoint });

//   const response: SDUIScreen = {
//     content: {
//       type: "list",
//       items: [
//         {
//           id: "123",
//           type: "ButtonView",
//           content: {
//             text: "Hello world",
//           },
//         },
//         {
//           type: "TextFieldView",
//           content: {
//             text: "text test",
//           },
//         },
//         {
//           type: "BannerWrapper",
//           content: {
//             padding: 16,
//             content: {
//               type: "ButtonView",
//               content: {
//                 text: "Я внутри BannerWrapper",
//               },
//             },
//           },
//         },
//       ],
//     },
//   };

//   return response;
// };

// const useScreen = (endpoint: string) => {
//   return useQuery({
//     queryKey: [endpoint],
//     queryFn: () => getScreen(endpoint),
//   });
// };

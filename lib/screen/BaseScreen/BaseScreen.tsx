import { Suspense } from "react";
import { DEFAULT_DS } from "../../utils/constants/defaults";
// import axios from "axios";
import { SDUIScreen } from "@model/types/fms/screen/SDUIScreen";
import { useQuery } from "@tanstack/react-query";
import { renderComponent } from "../../utils/renderComponent";

export type BaseScreenProps = {
  designSystem?: string;
  endpoint: string;
};

const getScreen = async (endpoint: string): Promise<SDUIScreen> => {
  // const response =  axios.get(endpoint);
  console.log({ endpoint });

  const response: SDUIScreen = {
    content: {
      type: "list",
      items: [
        {
          id: "123",
          type: "ButtonView",
          content: {
            text: "Hello world",
          },
        },
        {
          type: "TextFieldView",
          content: {
            text: "text test",
          },
        },
      ],
    },
  };

  return response;
};

const useScreen = (endpoint: string) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => getScreen(endpoint),
  });
};

export const BaseScreen = (props: BaseScreenProps) => {
  const { designSystem = DEFAULT_DS, endpoint } = props;

  const { data } = useScreen(endpoint);

  if (!data) {
    return <h1>No data </h1>;
  }

  return (
    <Suspense fallback={<div>loading...</div>}>
      <header>Header</header>
      {data?.content.type === "list" &&
        data.content.items.map((element) => {
          return renderComponent(element, designSystem);
        })}
      <footer>Footer</footer>
    </Suspense>
  );
};

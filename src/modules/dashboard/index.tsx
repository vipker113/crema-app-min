import { Alert, Card, Collapse } from "antd";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const { Panel } = Collapse;

const initialItems = [
  [
    {
      id: "1",
      title: "WooCommerce Setup",
      content: "You’re almost done! Start selling now.",
    },
    {
      id: "4",
      title: "Activity",
      content:
        "Latest published posts and recent comments. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab provident autem corporis nesciunt sequi culpa obcaecati neque voluptates tempore rem. Accusantium, reprehenderit modi qui natus dicta soluta enim iste aperiam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab provident autem corporis nesciunt sequi culpa obcaecati neque voluptates tempore rem. Accusantium, reprehenderit modi qui natus dicta soluta enim iste aperiam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab provident autem corporis nesciunt sequi culpa obcaecati neque voluptates tempore rem. Accusantium, reprehenderit modi qui natus dicta soluta enim iste aperiam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab provident autem corporis nesciunt sequi culpa obcaecati neque voluptates tempore rem. Accusantium, reprehenderit modi qui natus dicta soluta enim iste aperiam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab provident autem corporis nesciunt sequi culpa obcaecati neque voluptates tempore rem. Accusantium, reprehenderit modi qui natus dicta soluta enim iste aperiam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab provident autem corporis nesciunt sequi culpa obcaecati neque voluptates tempore rem. Accusantium, reprehenderit modi qui natus dicta soluta enim iste aperiam.",
    },
  ],
  [
    {
      id: "2",
      title: "Website Status",
      content: "Your site needs improvement. Check the Site Health section.",
    },
  ],
  [
    {
      id: "3",
      title: "Quick Draft",
      content: "Create quick notes or draft posts.",
    },
  ],
];

const DashBoard = () => {
  const [columns, setColumns] = useState(initialItems);

  const updateColumn = (colIndex: number, newList: any[]) => {
    setColumns((prev) => {
      const updated = [...prev];
      updated[colIndex] = newList;
      return updated;
    });
  };
  return (
    <div>
      <h1>DashBoard</h1>
      <div className="flex flex-col my-10 gap-4">
        <Alert
          message="Information"
          description={
            "Welcome to the Admin Dashboard. Please review the analytics and keep the content up to date regularly."
          }
          type="info"
          showIcon
          closable
        />
        <span></span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((colItems, colIndex) => (
            <ReactSortable
              key={colIndex}
              group={{ name: "dashboard", pull: true, put: true }}
              list={columns[colIndex]}
              setList={(newList) => updateColumn(colIndex, newList)}
              animation={200}
            >
              {colItems.map((item) => (
                <Collapse
                  key={item.id}
                  className="mb-4"
                  defaultActiveKey={["1"]}
                >
                  <Panel header={item.title} key={item.id}>
                    <p>{item.content}</p>
                  </Panel>
                </Collapse>
              ))}
            </ReactSortable>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

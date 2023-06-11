import { FC } from "react";
import { ITaskDialog } from "./interface";
import { Dialog } from "../../Dialog";
import { Button, Input, Select } from "antd";
//@ts-ignore
import classes from "./styles.module.scss";
import TextArea from "antd/es/input/TextArea";
import { SlackOutlined } from "@ant-design/icons";

export const TaskDialog: FC<ITaskDialog> = ({ open, closeHandler }) => {
  const actions = (
    <>
      <Button onClick={closeHandler}>Cancel</Button>
      <Button type="primary" onClick={closeHandler}>
        Save
      </Button>
    </>
  );

  return (
    <Dialog
      open={open}
      closeHandler={closeHandler}
      title="Task"
      actions={actions}
    >
      <form className={classes.form}>
        <div className="control">
          <label htmlFor="connection">
            <p className={classes.label}>Connection</p>
          </label>

          <div className={classes.connection}>
            <div className={classes.connection_icon}>
              <SlackOutlined />
            </div>
            <Select
              id="connection"
              className={classes.connection_selector}
              placeholder="Select someone"
              defaultValue="johnDoe"
              onChange={() => {}}
              options={[
                { value: "johnDoe", label: "John Doe" },
                { value: "janeSmith", label: "Jane Smith" },
                { value: "alexJohnson", label: "Alex Johnson" },
                { value: "sarahWilliams", label: "Sarah Williams" },
              ]}
            />
            <Button style={{ marginLeft: 8 }}>Add</Button>
          </div>
        </div>

        <div className="control">
          <label>
            <p className={classes.label}>Title</p>
            <Input placeholder="Task name" />
          </label>
        </div>

        <div className="control">
          <label>
            <p className={classes.label}> Assignee</p>
            <Select
              style={{
                width: "100%",
              }}
              placeholder="Select someone"
              defaultValue="johnDoe"
              onChange={() => {}}
              options={[
                { value: "johnDoe", label: "John Doe" },
                { value: "janeSmith", label: "Jane Smith" },
                { value: "alexJohnson", label: "Alex Johnson" },
                { value: "sarahWilliams", label: "Sarah Williams" },
              ]}
            />
          </label>
        </div>

        <div className="control">
          <label>
            <p className={classes.label}> Description</p>
            <TextArea placeholder="Write something" />
          </label>
        </div>
      </form>
    </Dialog>
  );
};

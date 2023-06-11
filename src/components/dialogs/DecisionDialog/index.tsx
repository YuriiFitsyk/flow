import { FC } from "react";
import { IDecisionDialog } from "./interface";
import { Dialog } from "../../Dialog";
import { Button, Input, Select } from "antd";
//@ts-ignore
import classes from "./styles.module.scss";

export const DecisionDialog: FC<IDecisionDialog> = ({ open, closeHandler }) => {
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
      title="Decision"
      actions={actions}
    >
      <form className={classes.form}>
        <div className="control">
          <label>
            <p className={classes.label}>Title</p>
            <Input placeholder="Decision name" />
          </label>
        </div>

        <div className="control">
          <label>
            <p className={classes.label}> Conditional requirements</p>
            <Select
              style={{
                width: "100%",
              }}
              placeholder="Decision name"
              defaultValue="AND"
              onChange={() => {}}
              options={[
                { value: "AND", label: "All conditions Met (AND)" },
                { value: "OR", label: "Some conditions Met (OR)" },
              ]}
            />
          </label>
        </div>
      </form>
    </Dialog>
  );
};

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Fragment } from "react";

export default function DatePicker({ onChange, range, open, setOpen }) {
    return (
      <Fragment>
        {open && (
          <div className="absolute z-40 mt-14">
            <DateRangePicker
              ranges={[range]}
              onChange={(e) => onChange(e.selection)}
            />
          </div>
        )}
      </Fragment>
    );
  }
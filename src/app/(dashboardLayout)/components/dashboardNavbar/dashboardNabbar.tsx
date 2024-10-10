import ProfileDropdown from "@/app/(commonLayout)/components/ProfileDropdown";
import { Badge, Button, Switch, Tooltip } from "@nextui-org/react";
import { Bell } from "lucide-react";
import React, { ReactNode } from "react";

const NavbarWrapper = ({ children }: { children: ReactNode }) => {
  const [isInvisible, setIsInvisible] = React.useState(true);

  return (
    <div className="w-full ">
      <div className="p-5 flex justify-between items-center bg-teal-100">
        <div className="flex-1">
          {/*  */}
          <Switch
            color="secondary"
            isSelected={!isInvisible}
            onValueChange={(value) => setIsInvisible(!value)}
          >
            {isInvisible ? "Dark Mode" : "Light Mode"}
          </Switch>
        </div>
        <div className="flex-1 flex gap-8 items-center justify-end">
            <Badge content="99+" shape="circle" color="danger">
              <Button
                radius="full"
                isIconOnly
                aria-label="more than 99 notifications"
                variant="light"
              >
          <Tooltip content={"Notification"} color="primary">
                <Bell size={24} className="text-secondary" />
          </Tooltip>
              </Button>
            </Badge>
          {/*  */}
          <Tooltip content={"Profile"} color="primary">
            <div className="max-w-fit">
              <ProfileDropdown />
            </div>
          </Tooltip>
        </div>
      </div>

      <div className="">{children}</div>
    </div>
  );
};

export default NavbarWrapper;

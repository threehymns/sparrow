"use client";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { SettingsIcon } from "@/components/ui/settings";
import { useState, useEffect, useCallback } from "react";

type SettingsConfig = Record<
  string,
  {
    label: string;
    options: string[];
    onChange: (value: string) => void;
  }
>;

const settingsConfig: SettingsConfig = {
  font: {
    label: "Font",
    options: [
      "Shantell Sans",
      "Fira Sans",
      "Inter",
      "Geist",
      "Nunito",
      "Poppins",
      "Barlow",
    ],
    onChange: (value: string) => {
      document.body.style.fontFamily = `${value}, 'Shantell Sans', sans-serif`;
      const link = document.createElement("link");
      link.href = `https://cdn.jsdelivr.net/npm/@fontsource/${value.toLowerCase()}@latest/400.min.css`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    },
  },
  accentColor: {
    label: "Accent Color",
    options: [
      "Blue",
      "Green",
      "Indigo",
      "Orange",
      "Pink",
      "Purple",
      "Red",
      "Yellow",
    ],
    onChange: (value: string) => {
      document.body.style.setProperty(
        "--primary",
        `var(--${value.toLowerCase()})`,
      );
      document.body.style.setProperty(
        "--primary-foreground",
        `var(--${value.toLowerCase()}-foreground)`,
      );
    },
  },
};

const useSettings = () => {
  const [settings, setSettings] = useState(() => {
    const initialSettings = Object.fromEntries(
      Object.entries(settingsConfig).map(([key, { options }]) => [
        key,
        options[0] ?? "",
      ]),
    );
    return initialSettings;
  });

  useEffect(() => {
    Object.entries(settingsConfig).forEach(([key, { onChange }]) => {
      if (settings[key]) {
        onChange(settings[key]);
      }
    });
  }, [settings]);

  const updateSetting = useCallback(
    (key: keyof SettingsConfig, value: string) => {
      setSettings((prev) => {
        const updatedSettings = { ...prev, [key]: value };
        localStorage.setItem("settings", JSON.stringify(updatedSettings));
        return updatedSettings;
      });
      settingsConfig[key]?.onChange(value);
    },
    [],
  );

  const reset = useCallback(() => {
    const defaultSettings = Object.fromEntries(
      Object.entries(settingsConfig).map(([key, { options }]) => [
        key,
        options[0] ?? "",
      ]),
    );
    setSettings(defaultSettings);
  }, []);

  return { settings, updateSetting, reset, setSettings };
};

export function Settings() {
  const { settings, updateSetting, setSettings } = useSettings();

  useEffect(() => {
    const storedSettings = localStorage.getItem("settings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings) as Record<string, string>);
    }
  }, [setSettings]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-md">
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Configure your app settings</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 p-4">
          {Object.entries(settingsConfig).map(([key, { label, options }]) => (
            <div key={key} className="space-y-1">
              <span className="text-sm font-semibold">{label}</span>
              <Selector
                value={settings[key] ?? ""}
                options={options}
                onChange={(value) => updateSetting(key, value)}
              />
            </div>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Selector({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            className="h-9"
            onValueChange={(value) => {
              const option = options.find((option) => option.startsWith(value));
              if (option) {
                onChange(option);
                setOpen(false);
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {option}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

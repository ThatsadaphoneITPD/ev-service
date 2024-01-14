import { navigate } from '@/app/shared/event-calendar/constants';
import { CalendarEvent } from '@/types';
import cn from '@/utils/class-names';
import { View, ViewsProps } from 'react-big-calendar';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';

// function ViewNamesGroup({
//   views: viewNames,
//   view,
//   messages,
//   onView,
// }: {
//   views: ViewsProps;
//   view: string;
//   messages: any;
//   onView: (view: string) => void;
// }) {
//   console.log('viewNames', Object.entries(viewNames));
//   return viewNames.map((name) => (
//     <button
//       type="button"
//       key={name}
//       className={cn(
//         'w-full rounded-md px-2.5 py-2 text-sm font-medium text-gray-900 transition-all dark:text-white md:w-20',
//         { 'bg-gray-900 text-white': view === name }
//       )}
//       onClick={() => onView(name)}
//     >
//       {messages[name]}
//     </button>
//   ));
// }

export default function CustomToolbar({
  label,
  localizer: { messages },
  onNavigate,
  onView,
  view,
  views,
}: {
  label: string;
  localizer: any;
  onNavigate: (navigate: any) => void;
  onView: (view: View) => void;
  view: string;
  views: ViewsProps<CalendarEvent, object>;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-t-lg border border-b-0 border-gray-100 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-6">
      <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-start">
        <span className="font-lexend text-xl font-medium text-gray-900 dark:text-white">
          {label}
        </span>
        <span className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate(navigate.PREVIOUS)}
            aria-label={messages.previous}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-md border border-gray-100 text-center text-gray-500 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            <PiCaretLeftBold
              strokeWidth={3}
              className={cn('h-3.5 w-3.5 transition-transform duration-200')}
            />
          </button>
          {/* <button
            type="button"
            onClick={() => onNavigate(navigate.TODAY)}
            aria-label={messages.today}
          >
            &#8226;
          </button> */}
          <button
            type="button"
            onClick={() => onNavigate(navigate.NEXT)}
            aria-label={messages.next}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-md border border-gray-100 text-center text-gray-500 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            <PiCaretRightBold
              strokeWidth={3}
              className={cn('h-3.5 w-3.5 transition-transform duration-200')}
            />
          </button>
        </span>
      </div>

      <div className="flex w-full items-center rounded-md border border-gray-100 md:w-auto">
        {/* <ViewNamesGroup
          view={view}
          views={views}
          messages={messages}
          onView={onView}
        /> */}
        {/* @ts-ignore */}
        {views.map((name) => (
          <button
            type="button"
            key={name}
            className={cn(
              'w-full rounded-md px-2.5 py-2 text-sm font-medium text-gray-900 transition-all dark:text-white md:w-20',
              { 'bg-gray-900 text-white': view === name }
            )}
            onClick={() => onView(name)}
          >
            {messages[name]}
          </button>
        ))}
      </div>
    </div>
  );
}

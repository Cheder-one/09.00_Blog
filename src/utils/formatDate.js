import { parseISO, format } from 'date-fns';
import { enUS } from 'date-fns/locale';

function formatDate(dateString) {
  const date = parseISO(dateString);
  const formattedDate = format(date, 'MMMM d, yyyy', { locale: enUS });
  return formattedDate;
}

export default formatDate;

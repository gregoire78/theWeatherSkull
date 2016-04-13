/**
 * Created by gregoire on 13/04/2016.
 */
export class Hour{
    hourFormat(date) {
        date = new Date(date * 1000);
        return date.getHours() + 'h' + ('0' + date.getMinutes()).slice(-2);
    }
}
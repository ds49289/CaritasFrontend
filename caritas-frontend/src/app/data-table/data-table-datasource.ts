import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  name: string;
  username: number;
  surname: string;
  oib: string;
  email: string;
  postalcode: string;
  birthday: string;
  sex: string;
  behavior: string
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  { username: 1, name: 'Hydrogen', surname: 'Prezime', oib: '924fds94', email:'mhm@fer.hr', postalcode: '20000',
birthday: '12.10.2002.',sex:'Male',behavior:'Lose'},
{ username: 2, name: 'Hydrogenvvvv', surname: 'Prhhezime', oib: '92453294', email:'mhhhm@fer.hr', postalcode: '20000',
birthday: '12.10.2002.',sex:'Male',behavior:'Lose'},
{ username: 3, name: 'Hydrogedddddn', surname: 'Praazime', oib: '924294', email:'mhm@fer.hr', postalcode: '20000',
birthday: '12.10.2002.',sex:'Male',behavior:'Lose'},
{ username: 4, name: 'Hydrogeaaaan', surname: 'Prehhzime', oib: '92455594', email:'mm@fer.hr', postalcode: '20000',
birthday: '12.10.2002.',sex:'Male',behavior:'Lose'},
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'username': return compare(+a.username, +b.username, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

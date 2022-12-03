import { Knex } from "knex";
import { FiltersProps } from "../constants/Filters";

export class FilterHelpers {
    public static filter = (
      filters: FiltersProps,
      query: Knex.QueryBuilder<{
        id: string;
        order_number: string;
        created_at: string;
        closed_at: string;
        u_fname: string;
        u_lname: string;
        os_name: string;
        c_name: string;
      }>,
      filterBy?: string,
      search?: string
    ): boolean | undefined => {
      if(!filterBy) return true;
      let count = 0;
      Object.keys(filters).forEach((key) => {
        const filter = filters[key].filter;
        const columns = filters[key].dbColumn;
        if (filter === filterBy) {
          query.where((q) => {
            columns.forEach(column => {
              q.orWhereILike(column, search);
            });
          });
          count++;
          return;
        }
      });
      return count != 0;
    };
  }
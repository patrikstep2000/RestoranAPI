import { Request } from "express";
import { RestaurantFilters } from "../constants/Filters";
import { TABLES } from "../constants/Tables";
import db from "../knexfile";
import { RestaurantType } from "../models/Restaurant";
import { FilterHelpers } from "../utils/Helpers";
import MealRepo from "./MealRepo";

class RestaurantRepo {
  public static getRestaurants = async (req:Request): Promise<RestaurantType[]> => {
    const { filterBy, search } = req.query;
    const filter = filterBy ? String(filterBy) : undefined;
    const searchFilter = search ? `%${search}%` : `%`;

    const query =  db(TABLES.RESTAURANT + " as r")
      .select({
        ID: "r.ID",
        Name: "r.Name",
        Details: "r.Details",
        ShortDetails: "r.ShortDetails",
        CityID: "c.ID",
        CityName: "c.Name",
        CountryID: "co.ID",
        CountryName: "co.Name",
        TagID: "t.ID",
        TagName: "t.Name",
      })
      .join("City as c", "c.ID", "=", "r.CityID")
      .join("Country as co", "co.ID", "=", "c.CountryID")
      .join("Tag as t", "t.ID", "=", "r.TagID")

      if(!FilterHelpers.filter(RestaurantFilters, query, filter, searchFilter)) return [];

      return query.then((data: any[]) => {
        return Promise.all(
          data.map((r) => {
            return {
              ID: r.ID,
              Name: r.Name,
              Details: r.Details,
              ShortDetails: r.ShortDetails,
              City: {
                ID: r.CityID,
                Name: r.CityName,
                Country: {
                  ID: r.CountryID,
                  Name: r.CountryName,
                },
              },
              Tag: {
                ID: r.TagID,
                Name: r.TagName,
              },
            };
          })
        );
      });
  };

  public static getRestaurantByID = async (id: string): Promise<RestaurantType> => {
    const meals = await MealRepo.getMealsByRestaurantId(id);

    return db(TABLES.RESTAURANT + " as r")
      .select({
        ID: "r.ID",
        Name: "r.Name",
        Details: "r.Details",
        ShortDetails: "r.ShortDetails",
        CityID: "c.ID",
        CityName: "c.Name",
        CountryID: "co.ID",
        CountryName: "co.Name",
        TagID: "t.ID",
        TagName: "t.Name",
      })
      .join("City as c", "c.ID", "=", "r.CityID")
      .join("Country as co", "co.ID", "=", "c.CountryID")
      .join("Tag as t", "t.ID", "=", "r.TagID")
      .where("r.ID", id)
      .then((data: any) => {
        const res = data[0];
        return {
          ID: res.ID,
          Name: res.Name,
          Details: res.Details,
          ShortDetails: res.ShortDetails,
          City: {
            ID: res.CityID,
            Name: res.CityName,
            Country: {
              ID: res.CountryID,
              Name: res.CountryName,
            },
          },
          Tag: {
            ID: res.TagID,
            Name: res.TagName,
          },
          Menu:meals
        };
      });
  };
}

export default RestaurantRepo;

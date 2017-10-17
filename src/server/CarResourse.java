package server;

import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/cars")
public class CarResourse {
	
	@GET 
	@Produces({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON, MediaType.TEXT_XML })
	public ArrayList<Car> getCars(){
		return CarDAO.instance.getCars();
	}
	@GET
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON, MediaType.TEXT_XML})
	@Path("{carId}")
	public Car getCar(@PathParam("carId") int id){
		return CarDAO.instance.getCar(id);
	}
	
	@POST
	@Produces(MediaType.TEXT_XML)
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON, MediaType.TEXT_XML})
	
	public void add(@FormParam("id") int id,
			@FormParam("make") String make, 
			@FormParam("model") String model,
			@FormParam("year") String year, 
			@FormParam("engine") String engine, 
			@FormParam("fuel") String fuel, 
			@FormParam("price") String price){	
		
		CarDAO.instance.add(id, make, model, year, engine, fuel, price);
	}
		
	@DELETE
	@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON, MediaType.TEXT_XML})
	@Path("{carId}")
	public Car delete(@PathParam("carId") String id){
		return CarDAO.instance.delete(Integer.parseInt(id));
	}
}

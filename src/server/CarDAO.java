package server;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public enum CarDAO {

	instance;
	Connection conn = null;

	private CarDAO() {
		try {
			Class.forName("org.hsqldb.jdbcDriver");
			conn = DriverManager.getConnection(
					"jdbc:hsqldb:hsql://localhost/oneDB", "sa", "");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	
	public ArrayList<Car> getCars() {
		ArrayList<Car> cars = new ArrayList<Car>();
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("Select * from cars");
			while (rs.next()) {
				int id = rs.getInt("id");
				String make = rs.getString("make");
				String model = rs.getString("model");
				String year = rs.getString("year");
				String engine = rs.getString("engine");
				String fuel = rs.getString("fuel");
				String price = rs.getString("price");
				Car c = new Car(id, make, model, year, engine, fuel, price);
				cars.add(c);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cars;
	}

	
	public Car getCar(int id) {
		Car c = null;
		try {
			if (conn == null) {
				System.out.println("Conn null");
			}
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("Select * from cars where id ="
					+ id + ";");
			while (rs.next()) {
				String make = rs.getString("make");
				String model = rs.getString("model");
				String year = rs.getString("year");
				String engine = rs.getString("engine");
				String fuel = rs.getString("fuel");
				String price = rs.getString("price");
				c = new Car(id, make, model, year, engine, fuel, price);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return c;
	}

	
	public Car add(int id, String make, String model, String year,
			String engine, String fuel, String price) {
		Car c = null;
		try {
			if (conn == null) {
				System.out.println("Conn null");
			}
			Statement stmt = conn.createStatement();
			@SuppressWarnings("unused")
			ResultSet rs = stmt.executeQuery("insert into cars VALUES ('" + id
					+ "','" + make + "','" + model + "','" + year + "','"
					+ engine + "','" + fuel + "','" + price + "');");
			stmt.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return c;
	}

	
	public Car delete(int id) {
		Car p = null;
		try {
			Statement stmt = conn.createStatement();
			@SuppressWarnings("unused")
			ResultSet rs = stmt.executeQuery("DELETE from cars where id =" + id
					+ ";");

		} catch (Exception e) {
			e.printStackTrace();
		}
		return p;
	}
}

package bookstore.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bookstore.data.CartInformationRepository;
import bookstore.data.DeliveryRepository;
import bookstore.data.OrderInformationRepository;
import bookstore.data.OrderRepository;
import bookstore.data.SaleRepository;
import bookstore.data.WardRepository;
import bookstore.model.CartInformation;
import bookstore.model.Delivery;
import bookstore.model.Order;
import bookstore.model.OrderInformation;
import bookstore.model.Sale;
import bookstore.model.User;
import bookstore.model.UserPrincipal;
import bookstore.model.Ward;
import bookstore.service.OrderResponse;
import lombok.RequiredArgsConstructor;

@RestController
@Controller
@RequiredArgsConstructor
@RequestMapping("/order")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class OrderController {
	private final OrderRepository orderRepo;
	private final OrderInformationRepository orderInfoRepo;
	private final DeliveryRepository deliveryRepo;
	private final WardRepository wardRepo;
	private final SaleRepository saleRepo;
	private final CartInformationRepository cartInfoRepo;
	@GetMapping()
	public Page<Order> getAllOrderByUserId(@RequestParam Map<String, String> params) {
		PageRequest page = PageRequest.of(0, 1);
		if (params.containsKey("page")) {
			page = page.withPage(Integer.parseInt(params.get("page")));
		}
		UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userPrincipal.getUser();
//		List<Order> orderList = orderRepo.findAllByUserId(user.getId());
//		List<OrderResponse> response = new ArrayList<OrderResponse>();
		return orderRepo.findAllByUserId(user.getId(), page);
//		orderList.forEach((order) -> {
//			OrderResponse orderResponse = new OrderResponse(order, order.getOrderInfo());
//			response.add(orderResponse);
//		});
//		return response;
	}
	
	@GetMapping("/count")
	public long getOrderCount() {
		return orderRepo.count();
	}
	
	@GetMapping("/{id}")
	public OrderResponse getOrderById(@PathVariable int id) {
		Optional<Order> order = orderRepo.findById(id);
		OrderResponse response = new OrderResponse(order.get(), order.get().getOrderInfo());
		return response;
	}
	
	@PostMapping
	public ResponseEntity<String> createOrder(@RequestBody Map<String, String> request) {
		// create new order and set user
		Order order = new Order();
		UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userPrincipal.getUser();
		order.setUser(user);
//		System.out.println(request.get("cartInfoBookList"));
		// handle delivery and location
		if (request.containsKey("delivery") && request.containsKey("ward") && request.containsKey("city") && request.containsKey("province") && request.containsKey("address")) {
			int deliveryId = Integer.parseInt(request.get("delivery"));
			
			// find delivery
			Optional<Delivery> deliveryOptional = deliveryRepo.findById(deliveryId);
			if (deliveryOptional.isPresent()) {
				order.setDelivery(deliveryOptional.get());
				// find location
				Ward ward = wardRepo.findByProvinceNameAndCityNameAndWardName(request.get("province"), request.get("city"), request.get("ward"));
				if (ward != null) {
					Delivery delivery = deliveryOptional.get();
					// get the price of delivery
					double price = delivery.getCoefficient() * ward.getCity().getProvince().getWeight() * delivery.getBase() + delivery.getBase();
					order.setDeliveryPrice(Math.round(price * 100.0)/100.0);
					// save location with string format
					order.setLocation(request.get("address") + " " + ward.getId().getWardName() + " " + ward.getCity().getId().getCityName() + " " + ward.getCity().getProvince().getProvinceName());
				}
			}
			// set order date
			order.setOrderDate(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()));
		}
		// handle list order items
		if (request.containsKey("cartInfoBookList")) {
			// get the cart info list id and turn into string list (format: 1,2,3,53,21)
			String cartInfoBookList = request.get("cartInfoBookList").replaceAll("\\[", "").replaceAll("\\]", "");
			String[] cartInfoBookListStr = cartInfoBookList.split(",");
			// change to int array
			List<Integer> cartInfoBookIdList = new ArrayList<Integer>();
			for (int i = 0; i < cartInfoBookListStr.length; i++) {
				cartInfoBookIdList.add(Integer.parseInt(cartInfoBookListStr[i]));
			}
			// find the associate cartInfo
			List<CartInformation> cartInfoList = cartInfoRepo.findCartInformationByUserIdAndBookId(user.getId(), cartInfoBookIdList);
			// find the sale
			List<Sale> saleList = saleRepo.findByEndDateIsNull();
			List<OrderInformation> orderInforList = new ArrayList<OrderInformation>();
			float totalPrice = 0;
			// loop through cart info list to get order info
			for (int i = 0; i < cartInfoList.size(); ++i) {
				CartInformation cartInfo = cartInfoList.get(i);
				OrderInformation orderInfo = new OrderInformation();
				orderInfo.setActualPrice(Math.round(cartInfo.getBook().getPrice() * 100.0) / 100.0);
				orderInfo.setBook(cartInfo.getBook());
				orderInfo.setPrice(Math.round(cartInfo.getBook().getPrice() * 100.0) / 100.0);
				orderInfo.setQuantity(cartInfo.getQuantity());
				// check the sale to change the actual price
				if (!saleList.isEmpty()) {
					Sale sale = saleList.get(0);
					if (cartInfo.getBook().getCategory().getId() == sale.getCategory().getId())
						
						orderInfo.setActualPrice(Math.round(((cartInfo.getBook().getPrice() * (100 - sale.getSalePercent())) / 100) * 100.0) / 100.0);
				}
				// add order info to the list and sum the total price
				orderInforList.add(orderInfo);
				totalPrice += orderInfo.getActualPrice() * orderInfo.getQuantity();
				// delete the cart info
				cartInfoRepo.removeCartInformationByUserIdAndBookId(cartInfo.getId().getUserId(), cartInfo.getId().getBookId());
			}
			// set the total price and save the order
			order.setTotalPrice(Math.round((totalPrice + order.getDeliveryPrice()) * 100.0) / 100.0);
			Order savedOrder = orderRepo.save(order);
			// set the order to each order info and save
			orderInforList.forEach(orderInfo -> {
				orderInfo.setOrder(savedOrder);
				orderInfoRepo.save(orderInfo);
			});
		} else {
			return new ResponseEntity<String> ("nothing to order", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String> ("order success", HttpStatus.CREATED);
	}
}

package bookstore.service;

import java.util.List;

import bookstore.model.Order;
import bookstore.model.OrderInformation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
	private Order order;
	private List<OrderInformation> orderInfor;
}

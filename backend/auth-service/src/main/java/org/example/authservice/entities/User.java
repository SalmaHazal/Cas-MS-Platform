package org.example.authservice.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.example.authservice.common.BaseAuditingEntity;
import org.example.authservice.constants.UserConstants;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @Builder
@Table(name = "users")
@NamedQuery(name = UserConstants.FIND_USER_BY_EMAIL,
        query = "SELECT u FROM User u WHERE u.email = :email")
@NamedQuery(name = UserConstants.FIND_ALL_USERS_EXCEPT_SELF,
        query = "SELECT u FROM User u WHERE u.id != :publicId")
@NamedQuery(name = UserConstants.FIND_USER_BY_PUBLIC_ID,
        query = "SELECT u FROM User u WHERE u.id = :publicId")

public class User {

    private static final int LAST_ACTIVE_INTERVAL = 5;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private Gender gender;

    private String question;

    private LocalDateTime lastSeen;

    private String role;

//    @OneToMany(mappedBy = "sender")
//    private List<Chat> chatsAsSender;
//
//    @OneToMany(mappedBy = "recipient")
//    private List<Chat> chatsAsRecipient;

    @Transient
    public boolean isUSerOnline() {
        return lastSeen != null && lastSeen.isAfter(LocalDateTime.now().minusMinutes(LAST_ACTIVE_INTERVAL));
    }
}
